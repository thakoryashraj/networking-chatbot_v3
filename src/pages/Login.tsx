import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bot, Eye, EyeOff, Sparkles, Zap, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, resetPassword, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isForgotPassword) {
        // Handle forgot password
        if (!formData.email) {
          toast({
            title: "Email Required",
            description: "Please enter your email address.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        const { error } = await resetPassword(formData.email);
        
        if (error) {
          toast({
            title: "Error",
            description: error,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Reset Link Sent",
            description: "Check your inbox for a password reset link.",
          });
          setIsForgotPassword(false);
          setIsLogin(true);
        }
      } else if (isLogin) {
        // Handle login
        if (!formData.email || !formData.password) {
          toast({
            title: "Missing Information",
            description: "Please enter your email and password.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          toast({
            title: "Login Failed",
            description: error,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been successfully logged in.",
          });
          navigate("/");
        }
      } else {
        // Handle signup
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          toast({
            title: "Password Too Short",
            description: "Password must be at least 6 characters long.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.name, formData.phone);
        
        if (error) {
          toast({
            title: "Signup Failed",
            description: error,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Welcome to AI Assistant! You're now logged in.",
          });
          navigate("/");
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-primary opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI Assistant
          </h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Powered by Advanced AI
            <Zap className="w-4 h-4" />
          </p>
        </div>

        {/* Login/Signup Card */}
        <Card className="backdrop-blur-sm bg-background/80 border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl">
              {isForgotPassword ? "Reset Password" : isLogin ? "Welcome Back" : "Get Started"}
            </CardTitle>
            <CardDescription className="text-base">
              {isForgotPassword 
                ? "Enter your email to receive a reset link"
                : isLogin 
                ? "Sign in to your AI-powered workspace" 
                : "Create your AI assistant account"
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-11"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="h-11"
                  required
                />
              </div>

              {!isLogin && !isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-11"
                    required
                  />
                </div>
              )}

              {!isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="h-11 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-primary hover:opacity-90 text-white font-medium"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {isForgotPassword ? "Sending..." : isLogin ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : (
                  <>
                    {isForgotPassword ? (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Reset Link
                      </>
                    ) : isLogin ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              
              <div className="text-center space-y-2">
                {!isForgotPassword && (
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {isLogin 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Sign in"
                    }
                  </Button>
                )}

                {isLogin && !isForgotPassword && (
                  <div>
                    <Button 
                      variant="link" 
                      className="text-sm text-muted-foreground hover:text-primary"
                      onClick={() => setIsForgotPassword(true)}
                    >
                      Forgot your password?
                    </Button>
                  </div>
                )}

                {isForgotPassword && (
                  <Button
                    variant="link"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setIsLogin(true);
                    }}
                    className="text-muted-foreground hover:text-primary"
                  >
                    Back to login
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Experience the future of AI assistance</p>
          <p className="mt-1">Secure • Intelligent • Efficient</p>
        </div>
      </div>
    </div>
  );
};

export default Login;