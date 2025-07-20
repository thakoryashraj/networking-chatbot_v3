import { Download, FileText, Image, Archive } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const recentLeads = [
	{
		id: "1",
		name: "Sarah Johnson",
		role: "Marketing Director",
		company: "TechCorp",
		avatar: "",
		status: "hot",
		addedTime: "2 mins ago",
	},
	{
		id: "2",
		name: "Michael Chen",
		role: "CTO",
		company: "StartupXYZ",
		avatar: "",
		status: "warm",
		addedTime: "15 mins ago",
	},
	{
		id: "3",
		name: "Emily Davis",
		role: "Product Manager",
		company: "InnovateCo",
		avatar: "",
		status: "cold",
		addedTime: "1 hour ago",
	},
	{
		id: "4",
		name: "James Wilson",
		role: "VP Sales",
		company: "GrowthInc",
		avatar: "",
		status: "hot",
		addedTime: "2 hours ago",
	},
	{
		id: "5",
		name: "Lisa Rodriguez",
		role: "Founder",
		company: "AIStartup",
		avatar: "",
		status: "warm",
		addedTime: "3 hours ago",
	},
];

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
	return (
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
				<div className="space-y-3 max-h-64 overflow-y-auto">
					{recentLeads.map((lead) => (
						<div
							key={lead.id}
							className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors group"
						>
							<Avatar className="w-10 h-10">
								<AvatarFallback className="bg-gradient-primary text-white text-sm">
									{lead.name.split(" ").map((n) => n[0]).join("")}
								</AvatarFallback>
							</Avatar>

							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<h3 className="font-medium text-sm text-foreground truncate">
										{lead.name}
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
								<p className="text-xs text-muted-foreground truncate">
									{lead.role} at {lead.company}
								</p>
								<p className="text-xs text-muted-foreground">
									{lead.addedTime}
								</p>
							</div>
						</div>
					))}
				</div>
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
	);
};