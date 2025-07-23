import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import toast from 'react-hot-toast';

export type LeadStatus = 'new' | 'contacted' | 'interested' | 'hot' | 'warm' | 'cold' | 'won' | 'lost';
export type LeadSource = 'chat' | 'visiting_card' | 'manual';

export interface Lead {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  company?: string;
  designation?: string;
  inquiry_type?: string;
  status: LeadStatus;
  note?: string;
  source: LeadSource;
  row_content?: any;
  assigned_to?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface LeadFilters {
  search: string;
  status: LeadStatus | 'all';
  source: LeadSource | 'all';
}

export interface CreateLeadData {
  full_name: string;
  email?: string;
  phone?: string;
  company?: string;
  designation?: string;
  inquiry_type?: string;
  status?: LeadStatus;
  note?: string;
}

export function useLeads() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [filters, setFilters] = useState<LeadFilters>({
    search: '',
    status: 'all',
    source: 'all'
  });

  // Load leads with filters
  const loadLeads = async () => {
    if (!user) return;

    try {
      setLoading(true);
      let query = supabase
        .from('leads')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      // Apply search filter
      if (filters.search) {
        query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }

      // Apply status filter
      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      // Apply source filter
      if (filters.source !== 'all') {
        query = query.eq('source', filters.source);
      }

      const { data, error } = await query;

      if (error) throw error;

      setLeads(data || []);
    } catch (error) {
      console.error('Error loading leads:', error);
      toast({
        title: 'Error',
        description: 'Failed to load leads. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Create new lead
  const createLead = async (leadData: CreateLeadData): Promise<boolean> => {
    if (!user) return false;

    setCreating(true);
    try {
      const { error } = await supabase
        .from('leads')
        toast.error('Failed to load leads. Please try again.', {
          duration: 4000,
          position: 'top-right',
        });

      if (error) throw error;

      // Remove the manual toast as realtime will handle it
      // toast({
      //   title: 'Lead Created',
      //   description: 'New lead has been successfully added.',
      // });

      await loadLeads();
      return true;
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error('Failed to create lead. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
      return false;
    } finally {
      setCreating(false);
    }
  };

  // Update lead
  const updateLead = async (id: string, leadData: Partial<CreateLeadData>): Promise<boolean> => {
    if (!user) return false;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('leads')
        .update(leadData)
        .eq('id', id)
        .eq('created_by', user.id);

      if (error) throw error;

      // Remove the manual toast as realtime will handle it
      // toast({
      //   title: 'Lead Updated',
      //   description: 'Lead has been successfully updated.',
      // });

      await loadLeads();
      return true;
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
      return false;
    } finally {
      setUpdating(false);
    }
  };

  // Delete lead
  const deleteLead = async (id: string): Promise<boolean> => {
    if (!user) return false;

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id)
        .eq('created_by', user.id);

      if (error) throw error;

      // Remove the manual toast as realtime will handle it
      // toast({
      //   title: 'Lead Deleted',
      //   description: 'Lead has been successfully deleted.',
      // });

      await loadLeads();
      return true;
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
      return false;
    } finally {
      setDeleting(false);
    }
  };

  // Update filters
  const updateFilters = (newFilters: Partial<LeadFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Load leads when user or filters change
  useEffect(() => {
    if (user) {
      loadLeads();
    }
  }, [user, filters]);

  return {
    leads,
    loading,
    creating,
    updating,
    deleting,
    filters,
    createLead,
    updateLead,
    deleteLead,
    updateFilters,
    refreshLeads: loadLeads,
  };
}