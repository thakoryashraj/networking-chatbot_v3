import { useState } from "react";
import { Plus, Search, Calendar as CalendarIcon, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Appointment {
  id: string;
  name: string;
  email: string;
  contact: string;
  topic: string;
  datetime: Date;
  comments: string;
  status: "scheduled" | "completed" | "cancelled";
}

const dummyAppointments: Appointment[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@techcorp.com",
    contact: "+1-555-0123",
    topic: "Product Demo",
    datetime: new Date("2024-01-20T14:00:00"),
    comments: "Interested in enterprise features",
    status: "scheduled"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@startupxyz.com",
    contact: "+1-555-0124",
    topic: "Technical Discussion",
    datetime: new Date("2024-01-18T10:30:00"),
    comments: "API integration requirements",
    status: "completed"
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@innovateco.com",
    contact: "+1-555-0125",
    topic: "Pricing Consultation",
    datetime: new Date("2024-01-22T16:00:00"),
    comments: "Budget discussion",
    status: "scheduled"
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@growthinc.com",
    contact: "+1-555-0126",
    topic: "Partnership Meeting",
    datetime: new Date("2024-01-17T09:00:00"),
    comments: "Strategic partnership discussion",
    status: "cancelled"
  },
  {
    id: "5",
    name: "Lisa Rodriguez",
    email: "lisa@aistartup.com",
    contact: "+1-555-0127",
    topic: "Follow-up Call",
    datetime: new Date("2024-01-25T11:00:00"),
    comments: "Post-demo questions",
    status: "scheduled"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "completed":
      return "bg-green-100 text-green-700 border-green-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(dummyAppointments);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = appointments.filter((appointment) => {
    return appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           appointment.topic.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="p-6 bg-gradient-chat min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground mt-2">Schedule and manage your meetings</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6 bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter(a => a.status === "scheduled").length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter(a => a.status === "completed").length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {appointments.filter(a => a.status === "cancelled").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.name}</TableCell>
                    <TableCell>{appointment.email}</TableCell>
                    <TableCell>{appointment.contact}</TableCell>
                    <TableCell>{appointment.topic}</TableCell>
                    <TableCell>{formatDateTime(appointment.datetime)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(appointment.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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

export default Appointments;