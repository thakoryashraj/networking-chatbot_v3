import { useState } from "react";
import { HelpCircle, FileText, Video, MessageCircle, ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const faqData = [
  {
    question: "How do I start using the AI Assistant?",
    answer: "Simply navigate to the Chat section from the sidebar and start typing your questions. The AI will respond instantly with helpful information and suggestions."
  },
  {
    question: "Can I integrate the AI with my existing CRM?",
    answer: "Yes! Our platform supports API integrations with popular CRM systems. Check our documentation or contact support for specific integration guides."
  },
  {
    question: "How accurate are the AI responses?",
    answer: "Our AI maintains a 98%+ accuracy rate and continuously learns from interactions. For complex queries, it can escalate to human support when needed."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and follow strict data privacy protocols. Your conversations and data are never shared with third parties."
  },
  {
    question: "Can I customize the AI for my business?",
    answer: "Yes, premium users can train custom models with their specific business data and terminology for more personalized responses."
  }
];

const videoTutorials = [
  {
    title: "Getting Started with AI Assistant",
    description: "Learn the basics of navigating and using the platform",
    duration: "5:30",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop"
  },
  {
    title: "Managing Leads Effectively",
    description: "How to track and convert leads using our CRM features",
    duration: "8:45",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop"
  },
  {
    title: "Setting Up Appointments",
    description: "Schedule and manage meetings with your prospects",
    duration: "6:20",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
  },
  {
    title: "Analytics and Reporting",
    description: "Understanding your performance metrics and insights",
    duration: "10:15",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
  }
];

const blogPosts = [
  {
    title: "10 Best Practices for AI-Powered Customer Support",
    excerpt: "Discover how to leverage AI to improve your customer service and increase satisfaction rates.",
    publishedAt: "January 15, 2024",
    readTime: "8 min read",
    category: "Best Practices"
  },
  {
    title: "The Future of SaaS: AI Integration Trends",
    excerpt: "Explore the latest trends in AI integration within SaaS platforms and what it means for businesses.",
    publishedAt: "January 12, 2024",
    readTime: "12 min read",
    category: "Industry Insights"
  },
  {
    title: "Converting Leads: A Data-Driven Approach",
    excerpt: "Learn how to use analytics and AI insights to improve your lead conversion rates.",
    publishedAt: "January 10, 2024",
    readTime: "6 min read",
    category: "Sales & Marketing"
  },
  {
    title: "Building Trust Through Transparent AI",
    excerpt: "Why transparency in AI systems builds customer trust and how to implement it.",
    publishedAt: "January 8, 2024",
    readTime: "10 min read",
    category: "AI Ethics"
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="mb-4">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{question}</CardTitle>
              {isOpen ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <p className="text-muted-foreground">{answer}</p>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

const Tutorial = () => {
  return (
    <div className="p-6 bg-gradient-chat min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Help & Tutorial Center</h1>
          <p className="text-muted-foreground mt-2">
            Everything you need to know about using our AI Assistant platform
          </p>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Video Tutorials
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Blog & Guides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4">
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find quick answers to common questions about our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Watch step-by-step guides to master our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videoTutorials.map((video, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-sm">
                            <Video className="w-6 h-6 text-white" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Blog & Guides</CardTitle>
                <CardDescription>
                  In-depth articles and guides to help you succeed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts.map((post, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        </div>
                        <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{post.publishedAt}</span>
                          <Button variant="ghost" size="sm">
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Support */}
        <Card className="mt-8 bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tutorial;