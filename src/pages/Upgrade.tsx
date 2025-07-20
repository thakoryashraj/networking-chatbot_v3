import { Crown, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Upgrade = () => {
  return (
    <div className="p-6 bg-gradient-chat min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Upgrade Your Plan</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of our AI Assistant platform with advanced features 
            and premium support designed for growing businesses.
          </p>
        </div>

        <div className="flex items-center justify-center min-h-96 bg-background/80 backdrop-blur-sm rounded-lg border border-border mb-8">
          <div className="text-center">
            <Crown className="w-24 h-24 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Premium Features Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              We're working on exciting premium features that will take your AI assistant 
              experience to the next level. Stay tuned for updates!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
              <div className="p-4 border border-border rounded-lg">
                <Star className="w-5 h-5 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Advanced Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Deep insights into conversations and user engagement
                </p>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <Star className="w-5 h-5 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Custom AI Models</h3>
                <p className="text-sm text-muted-foreground">
                  Train personalized AI models for your specific use case
                </p>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <Star className="w-5 h-5 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Priority Support</h3>
                <p className="text-sm text-muted-foreground">
                  24/7 dedicated support with faster response times
                </p>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <Star className="w-5 h-5 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Team Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced team features and role-based access control
                </p>
              </div>
            </div>
            
            <Button variant="outline" className="mb-4">
              Join Waitlist for Premium Features
            </Button>
          </div>
        </div>

        {/* Current Plan */}
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You're currently on the Premium plan</CardDescription>
              </div>
              <Badge className="bg-primary text-primary-foreground">
                Premium
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Unlimited conversations</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Advanced chat features</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Lead management</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Appointment scheduling</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Email integration</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Knowledge base</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upgrade;