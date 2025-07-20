import { useState, useEffect } from "react";
import { Download, FileText, Image, Archive } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ViewLeadDialog } from "@/components/leads/ViewLeadDialog";
import { formatDistanceToNow } from "date-fns";

interface RecentLead {
	id: string;
	full_name: string;
	company?: string;
	designation?: string;
	status: 'new' | 'contacted' | 'interested' | 'hot' | 'warm' | 'cold' | 'won' | 'lost';
	created_at: string;
	email?: string;
	phone?: string;
	inquiry_type?: string;
	note?: string;
	source: 'chat' | 'visiting_card' | 'manual';
	row_content?: any;
	assigned_to?: string;
	created_by: string;
	updated_at: string;
}


const knowledgeBaseFiles = [
	{
		id: "1",
		name: "SaaS Business Plan Template",
		type: "PDF",
		size: "2.4 MB",
		icon: FileText,
		color: "text-red-500",
	},
	{
		id: "2",
		name: "Marketing Strategy Guide",
		type: "DOC",
		size: "1.8 MB",
		icon: FileText,
		color: "text-blue-500",
	},
	{
		id: "3",
		name: "Product Screenshots",
		type: "ZIP",
		size: "15.3 MB",
		icon: Archive,
		color: "text-yellow-500",
	},
	{
		id: "4",
		name: "User Interface Mockups",
		type: "PNG",
		size: "5.7 MB",
		icon: Image,
		color: "text-green-500",
	},
	{
		id: "5",
		name: "Financial Projections",
		type: "XLS",
		size: "892 KB",
		icon: FileText,
		color: "text-emerald-500",
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "hot":
			return "bg-red-100 text-red-700 border-red-200";
		case "warm":
			return "bg-orange-100 text-orange-700 border-orange-200";
		case "cold":
			return "bg-blue-100 text-blue-700 border-blue-200";
		default:
			return "bg-gray-100 text-gray-700 border-gray-200";
	}
};

export const RightSidebar = () => {
	const { user } = useAuth();
	const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedLead, setSelectedLead] = useState<RecentLead | null>(null);
	const [viewModalOpen, setViewModalOpen] = useState(false);

	// Fetch recent leads
	useEffect(() => {
		const fetchRecentLeads = async () => {
			if (!user) return;

			try {
				const { data, error } = await supabase
					.from('leads')
					.select('*')
					.eq('created_by', user.id)
					.order('created_at', { ascending: false })
					.limit(5);

				if (error) {
					console.error('Error fetching recent leads:', error);
					return;
				}

				setRecentLeads(data || []);
			} catch (error) {
				console.error('Error fetching recent leads:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchRecentLeads();
	}, [user]);

	const handleLeadClick = (lead: RecentLead) => {
		setSelectedLead(lead);
		setViewModalOpen(true);
	};

	const formatTimeAgo = (dateString: string) => {
		try {
			return formatDistanceToNow(new Date(dateString), { addSuffix: true });
		} catch (error) {
			return 'Unknown';
		}
	};

	return (
		<>
			<div className="fixed right-0 top-0 w-80 h-screen border-l border-border bg-background/50 backdrop-blur-sm flex flex-col">
			{/* Recently Added Leads */}
			<div className="p-4 border-b border-border">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-foreground">
						Recently Added Leads
					</h2>
					<Badge variant="secondary" className="text-xs">
						{recentLeads.length}
					</Badge>
				</div>
				{loading ? (
					<div className="space-y-3 max-h-64">
						{[...Array(3)].map((_, i) => (
							<div key={i} className="flex items-center gap-3 p-3 rounded-lg">
								<div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-muted rounded animate-pulse"></div>
									<div className="h-3 bg-muted rounded w-3/4 animate-pulse"></div>
								</div>
							</div>
						))}
					</div>
				) : recentLeads.length > 0 ? (
					<div className="space-y-3 max-h-64 overflow-y-auto">
						{recentLeads.map((lead) => (
							<div
								key={lead.id}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors group"
								onClick={() => handleLeadClick(lead)}
							>
								<Avatar className="w-10 h-10">
									<AvatarFallback className="bg-gradient-primary text-white text-sm">
										{lead.full_name.split(" ").map((n) => n[0]).join("")}
									</AvatarFallback>
								</Avatar>

								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1">
										<h3 className="font-medium text-sm text-foreground truncate">
											{lead.full_name}
										</h3>
										<Badge
											variant="outline"
											className={cn(
												"text-xs px-2 py-0",
												getStatusColor(lead.status)
											)}
										>
											{lead.status}
										</Badge>
									</div>
									{(lead.designation || lead.company) && (
										<p className="text-xs text-muted-foreground truncate">
											{lead.designation && lead.company 
												? `${lead.designation} at ${lead.company}`
												: lead.designation || lead.company
											}
										</p>
									)}
									<p className="text-xs text-muted-foreground">
										{formatTimeAgo(lead.created_at)}
									</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-8">
						<p className="text-sm text-muted-foreground">No recent leads</p>
						<p className="text-xs text-muted-foreground mt-1">Add your first lead to see it here</p>
					</div>
				)}
			</div>

			{/* Knowledge Base Files */}
			<div className="p-4 border-b border-border">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-foreground">
						Knowledge Base
					</h2>
					<Badge variant="secondary" className="text-xs">
						{knowledgeBaseFiles.length} files
					</Badge>
				</div>
				<div className="space-y-3 max-h-64 overflow-y-auto">
					{knowledgeBaseFiles.map((file) => (
						<div
							key={file.id}
							className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors group"
						>
							<div
								className={cn(
									"p-2 rounded-lg bg-secondary",
									file.color
								)}
							>
								<file.icon className="w-4 h-4" />
							</div>

							<div className="flex-1 min-w-0">
								<h3 className="font-medium text-sm text-foreground truncate">
									{file.name}
								</h3>
								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<span>{file.type}</span>
									<span>•</span>
									<span>{file.size}</span>
								</div>
							</div>

							<Button
								variant="ghost"
								size="icon"
								className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<Download className="w-4 h-4" />
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>

			{/* View Lead Modal */}
			<ViewLeadDialog
				lead={selectedLead}
				open={viewModalOpen}
				onOpenChange={setViewModalOpen}
			/>
		</>
	);
};