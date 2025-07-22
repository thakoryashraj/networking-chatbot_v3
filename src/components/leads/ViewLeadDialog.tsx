import { useId } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Lead } from '@/hooks/useLeads';
import { format } from 'date-fns';

interface ViewLeadDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'contacted':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'interested':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'hot':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'warm':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'cold':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'won':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'lost':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getSourceColor = (source: string) => {
  switch (source) {
    case 'chat':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'visiting_card':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'manual':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export function ViewLeadDialog({ lead, open, onOpenChange }: ViewLeadDialogProps) {
  const titleId = useId();
  
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle id={titleId}>Lead Details</DialogTitle>
          <DialogDescription>
            View complete information for this lead
          </DialogDescription>
        </DialogHeader>

        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
          <DialogDescription>
            View detailed information about this lead.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Header with name and badges */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground">{lead.full_name}</h3>
              {lead.designation && lead.company && (
                <p className="text-muted-foreground">
                  {lead.designation} at {lead.company}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className={getStatusColor(lead.status)}>
                {lead.status}
              </Badge>
              <Badge variant="outline" className={getSourceColor(lead.source)}>
                {lead.source.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Contact Information</h4>
              
              {lead.email && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{lead.email}</p>
                </div>
              )}
              
              {lead.phone && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-foreground">{lead.phone}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Organization</h4>
              
              {lead.company && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="text-foreground">{lead.company}</p>
                </div>
              )}
              
              {lead.designation && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Designation</label>
                  <p className="text-foreground">{lead.designation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Inquiry Information */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Inquiry Details</h4>
            
            {lead.inquiry_type && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Inquiry Type</label>
                <p className="text-foreground">{lead.inquiry_type}</p>
              </div>
            )}
            
            {lead.note && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Notes</label>
                <p className="text-foreground whitespace-pre-wrap">{lead.note}</p>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Created:</span>
              <span className="text-foreground">
                {format(new Date(lead.created_at), 'PPP p')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Updated:</span>
              <span className="text-foreground">
                {format(new Date(lead.updated_at), 'PPP p')}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}