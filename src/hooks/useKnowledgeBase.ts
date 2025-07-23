import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface KnowledgeBaseUrl {
  id: string;
  user_id: string;
  title: string;
  drive_url: string;
  status: string | null;
  created_at: string;
}

export function useKnowledgeBase() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [urls, setUrls] = useState<KnowledgeBaseUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Load user's URLs
  const loadUrls = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_urls_knowledgebase')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUrls(data || []);
    } catch (error) {
      console.error('Error loading URLs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load URLs. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Create new URL
  const createUrl = async (title: string, drive_url: string): Promise<boolean> => {
    if (!user) return false;

    setCreating(true);
    try {
      const { error } = await supabase
        .from('user_urls_knowledgebase')
        .insert({
          user_id: user.id,
          title,
          drive_url,
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: 'URL Added',
        description: 'Your URL has been successfully added to the knowledge base.',
      });

      await loadUrls();
      return true;
    } catch (error) {
      console.error('Error creating URL:', error);
      toast({
        title: 'Error',
        description: 'Failed to add URL. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setCreating(false);
    }
  };

  // Delete URL and associated documents
  const deleteUrl = async (urlId: string): Promise<boolean> => {
    if (!user) return false;

    setDeleting(true);
    try {
      // First, delete associated documents
      const { error: documentsError } = await supabase
        .from('documents')
        .delete()
        .eq('url_id', urlId);

      if (documentsError) {
        console.error('Error deleting documents:', documentsError);
        // Continue with URL deletion even if document deletion fails
      }

      // Then delete the URL record
      const { error: urlError } = await supabase
        .from('user_urls_knowledgebase')
        .delete()
        .eq('id', urlId)
        .eq('user_id', user.id); // Ensure user can only delete their own URLs

      if (urlError) throw urlError;

      toast({
        title: 'URL Deleted',
        description: 'URL and associated documents have been successfully deleted.',
      });

      await loadUrls();
      return true;
    } catch (error) {
      console.error('Error deleting URL:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete URL. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setDeleting(false);
    }
  };

  // Load URLs when user changes
  useEffect(() => {
    if (user) {
      loadUrls();
    }
  }, [user]);

  return {
    urls,
    loading,
    creating,
    deleting,
    createUrl,
    deleteUrl,
    refreshUrls: loadUrls,
  };
}