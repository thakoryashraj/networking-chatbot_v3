import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

interface LeadRealtimePayload {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  company?: string;
  designation?: string;
  inquiry_type?: string;
  status: string;
  note?: string;
  source: string;
  row_content?: any;
  assigned_to?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export function useLeadsRealtime() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Subscribe to realtime changes on the leads table
    const subscription = supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads',
        },
        (payload: RealtimePostgresChangesPayload<LeadRealtimePayload>) => {
          // Only show notifications for the current user's actions
          const leadData = payload.new as LeadRealtimePayload || payload.old as LeadRealtimePayload;
          
          if (!leadData || leadData.created_by !== user.id) {
            return;
          }

          switch (payload.eventType) {
            case 'INSERT':
              toast.success(
                `New lead "${leadData.full_name}" has been added successfully!`,
                {
                  duration: 4000,
                  position: 'top-right',
                  icon: '✅',
                  style: {
                    background: '#10B981',
                    color: '#fff',
                  },
                }
              );
              break;

            case 'UPDATE':
              toast.success(
                `Lead "${leadData.full_name}" has been updated successfully!`,
                {
                  duration: 4000,
                  position: 'top-right',
                  icon: '📝',
                  style: {
                    background: '#3B82F6',
                    color: '#fff',
                  },
                }
              );
              break;

            case 'DELETE':
              toast.success(
                `Lead "${leadData.full_name}" has been deleted successfully!`,
                {
                  duration: 4000,
                  position: 'top-right',
                  icon: '🗑️',
                  style: {
                    background: '#EF4444',
                    color: '#fff',
                  },
                }
              );
              break;

            default:
              break;
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);
}