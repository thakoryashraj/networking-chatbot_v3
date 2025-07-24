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
          console.log('Realtime payload received:', payload);
          
          // Get the lead data from the payload
          const leadData = payload.new as LeadRealtimePayload || payload.old as LeadRealtimePayload;
          
          if (!leadData) {
            console.log('No lead data in payload');
            return;
          }

          // Only show notifications for the current user's actions
          // Check both created_by and assigned_to to cover all user-related leads
          const isUserLead = leadData.created_by === user.id || leadData.assigned_to === user.id;
          
          if (!isUserLead) {
            console.log('Lead not related to current user, skipping notification');
            return;
          }

          // Handle different event types
          switch (payload.eventType) {
            case 'INSERT':
              toast.success(
                `✅ New lead "${leadData.full_name}" has been added successfully!`,
                {
                  duration: 4000,
                  position: 'top-right',
                  style: {
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: '500',
                  },
                }
              );
              break;

            case 'UPDATE':
              toast.success(
                `📝 Lead "${leadData.full_name}" has been updated successfully!`,
                {
                  duration: 4000,
                  position: 'top-right',
                  style: {
                    background: '#3B82F6',
                    color: '#fff',
                    fontWeight: '500',
                  },
                }
              );
              break;

            case 'DELETE':
              // For DELETE events, the data is in payload.old
              const deletedLead = payload.old as LeadRealtimePayload;
              if (deletedLead) {
                toast.success(
                  `🗑️ Lead "${deletedLead.full_name}" has been deleted successfully!`,
                  {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                      background: '#EF4444',
                      color: '#fff',
                      fontWeight: '500',
                    },
                  }
                );
              }
              break;

            default:
              console.log('Unknown event type:', payload.eventType);
              break;
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('Unsubscribing from realtime changes');
      subscription.unsubscribe();
    };
  }, [user]);
}