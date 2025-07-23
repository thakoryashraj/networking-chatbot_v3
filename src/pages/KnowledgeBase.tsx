import { useState } from "react";
import { Plus, ExternalLink, Trash2, Calendar, Link, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'processed':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'failed':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const KnowledgeBase = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();
  const { urls, loading, creating, deleting, createUrl, deleteUrl } = useKnowledgeBase();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteUrlId, setDeleteUrlId] = useState<string | null>(null);
  const [sendingUrlId, setSendingUrlId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    drive_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.drive_url.trim()) {
      return;
    }

    const success = await createUrl(formData.title.trim(), formData.drive_url.trim());
    if (success) {
      setFormData({ title: "", drive_url: "" });
      setAddDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    if (deleteUrlId) {
      await deleteUrl(deleteUrlId);
      setDeleteUrlId(null);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", drive_url: "" });
  };

  const handleSendToWebhook = async (url: any) => {
    if (!user || !profile) {
      toast({
        title: 'Error',
        description: 'User information not available.',
        variant: 'destructive',
      });
      return;
    }

    setSendingUrlId(url.id);
    
    try {
      const payload = {
        user_id: user.id,
        username: profile.full_name || user.email?.split('@')[0] || 'Unknown User',
        url_id: url.id,
        drive_url: url.drive_url,
        title: url.title,
      };

      const response = await fetch('https://automation.thinknlink.in/webhook-test/knowledge-base', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast({
        title: 'Sent Successfully',
        description: 'URL has been sent to the processing webhook.',
      });
    } catch (error) {
      console.error('Error sending to webhook:', error);
      toast({
        title: 'Send Failed',
        description: 'Failed to send URL to webhook. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSendingUrlId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-chat min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Knowledge Base</h1>
            <p className="text-muted-foreground mt-2">Manage your URL resources and documents</p>
          </div>
          <div className="w-full sm:w-auto">
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add URL
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New URL</DialogTitle>
                  <DialogDescription>
                    Add a new URL to your knowledge base for processing.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter a descriptive title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="drive_url">Drive URL</Label>
                    <Input
                      id="drive_url"
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={formData.drive_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, drive_url: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setAddDialogOpen(false);
                        resetForm();
                      }}
                      disabled={creating}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={creating}>
                      {creating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                          Adding...
                        </>
                      ) : (
                        'Add URL'
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Total URLs</CardTitle>
              <Link className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{urls.length}</div>
              <p className="text-xs text-muted-foreground hidden sm:block">in your knowledge base</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Pending</CardTitle>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                {urls.filter(url => url.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">awaiting processing</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Processed</CardTitle>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {urls.filter(url => url.status === 'processed').length}
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">ready for use</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Failed</CardTitle>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {urls.filter(url => url.status === 'failed').length}
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">processing errors</p>
            </CardContent>
          </Card>
        </div>

        {/* URLs Table */}
        {loading ? (
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading URLs...</p>
            </CardContent>
          </Card>
        ) : urls.length === 0 ? (
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Link className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No URLs Added</h3>
              <p className="text-muted-foreground mb-4">
                Start building your knowledge base by adding your first URL.
              </p>
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First URL
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Your URLs</CardTitle>
              <CardDescription>
                Manage and track the processing status of your knowledge base URLs
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Title</TableHead>
                      <TableHead className="min-w-[300px] hidden sm:table-cell">URL</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[120px] hidden md:table-cell">Created</TableHead>
                      <TableHead className="text-right min-w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {urls.map((url) => (
                      <TableRow key={url.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-medium">{url.title}</div>
                            <div className="text-sm text-muted-foreground sm:hidden">
                              <div className="flex items-center gap-1 mt-1">
                                <ExternalLink className="w-3 h-3" />
                                <span className="truncate max-w-[200px]">{url.drive_url}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                            <a
                              href={url.drive_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline truncate max-w-[250px]"
                            >
                              {url.drive_url}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(url.status || 'pending')}>
                            {url.status || 'pending'}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(url.created_at), 'MMM dd, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSendToWebhook(url)}
                              className="h-8 w-8 text-primary hover:text-primary"
                              disabled={sendingUrlId === url.id || deleting}
                              title="Send to processing webhook"
                            >
                              {sendingUrlId === url.id ? (
                                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteUrlId(url.id)}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              disabled={deleting || sendingUrlId === url.id}
                              title="Delete URL"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteUrlId} onOpenChange={(open) => !open && setDeleteUrlId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete URL</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this URL? This will also remove all associated documents 
                and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="bg-destructive hover:bg-destructive/90"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default KnowledgeBase;