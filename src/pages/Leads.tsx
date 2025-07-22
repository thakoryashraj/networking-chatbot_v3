import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddLeadDialog } from "@/components/leads/AddLeadDialog";
import { LeadFilters } from "@/components/leads/LeadFilters";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { useLeads } from "@/hooks/useLeads";

const Leads = () => {
  const { leads, loading, filters, updateFilters } = useLeads();

  return (
    <div className="p-4 sm:p-6 bg-gradient-chat min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Leads Management</h1>
            <p className="text-muted-foreground mt-2">Manage and track your potential customers</p>
          </div>
          <div className="w-full sm:w-auto">
            <AddLeadDialog />
          </div>
        </div>

        {/* Filters & Search */}
        <LeadFilters filters={filters} onFiltersChange={updateFilters} />

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{leads.length}</div>
              <p className="text-xs text-muted-foreground hidden sm:block">leads in your pipeline</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Hot Leads</CardTitle>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {leads.filter(l => l.status === 'hot').length}
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">high priority leads</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Won Leads</CardTitle>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {leads.filter(l => l.status === 'won').length}
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">successful conversions</p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">New Leads</CardTitle>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {leads.filter(l => l.status === 'new').length}
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">awaiting contact</p>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        {loading ? (
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading leads...</p>
            </CardContent>
          </Card>
        ) : (
          <LeadsTable leads={leads} />
        )}
      </div>
    </div>
  );
};

export default Leads;