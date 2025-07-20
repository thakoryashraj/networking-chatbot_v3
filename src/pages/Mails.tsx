import { Mail, Send, Inbox, Archive, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EmailHistory {
  id: string;
  recipient: string;
  subject: string;
  contentOverview: string;
  sentAt: Date;
  status: "sent" | "delivered" | "opened" | "replied";
  type: "marketing" | "support" | "sales" | "notification";
}

const dummyEmails: EmailHistory[] = [
  {
    id: "1",
    recipient: "sarah@techcorp.com",
    subject: "Welcome to AI Assistant Platform",
    contentOverview: "Welcome email with getting started guide and onboarding steps...",
    sentAt: new Date("2024-01-18T09:30:00"),
    status: "opened",
    type: "marketing"
  },
  {
    id: "2",
    recipient: "m.chen@startupxyz.com",
    subject: "API Integration Documentation",
    contentOverview: "Technical documentation and API keys for integration setup...",
    sentAt: new Date("2024-01-17T14:20:00"),
    status: "replied",
    type: "support"
  },
  {
    id: "3",
    recipient: "emily@innovateco.com",
    subject: "Custom Pricing Proposal",
    contentOverview: "Detailed pricing proposal based on requirements discussion...",
    sentAt: new Date("2024-01-16T11:15:00"),
    status: "delivered",
    type: "sales"
  },
  {
    id: "4",
    recipient: "james@growthinc.com",
    subject: "Demo Session Follow-up",
    contentOverview: "Thank you for the demo session and next steps information...",
    sentAt: new Date("2024-01-15T16:45:00"),
    status: "opened",
    type: "sales"
  },
  {
    id: "5",
    recipient: "lisa@aistartup.com",
    subject: "Partnership Opportunity Discussion",
    contentOverview: "Detailed partnership proposal and collaboration benefits...",
    sentAt: new Date("2024-01-14T10:00:00"),
    status: "sent",
    type: "sales"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "sent":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "delivered":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "opened":
      return "bg-green-100 text-green-700 border-green-200";
    case "replied":
      return "bg-purple-100 text-purple-700 border-purple-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "marketing":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "support":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "sales":
      return "bg-green-100 text-green-700 border-green-200";
    case "notification":
      return "bg-purple-100 text-purple-700 border-purple-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const Mails = () => {
  return (
    <div className="p-6 bg-gradient-chat min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Email History</h1>
          <p className="text-muted-foreground mt-2">Track and manage your email communications</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dummyEmails.length}</div>
              <p className="text-xs text-muted-foreground">emails this month</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
              <Inbox className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">successful deliveries</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76.2%</div>
              <p className="text-xs text-muted-foreground">emails opened</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reply Rate</CardTitle>
              <Archive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.8%</div>
              <p className="text-xs text-muted-foreground">emails replied</p>
            </CardContent>
          </Card>
        </div>

        {/* Email History Table */}
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Email History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Content Overview</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyEmails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell className="font-medium">{email.recipient}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={email.subject}>
                        {email.subject}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-sm">
                      <div className="truncate text-muted-foreground" title={email.contentOverview}>
                        {email.contentOverview}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(email.type)}>
                        {email.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(email.status)}>
                        {email.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {email.sentAt.toLocaleDateString()} {email.sentAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mails;