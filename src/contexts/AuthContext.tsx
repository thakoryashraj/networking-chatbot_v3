import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, phone: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, phone: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: name,
            phone: phone,
          }
        }
      });

      if (error) {
        // Return user-friendly error messages
        if (error.message.includes('already registered')) {
          return { error: 'This email is already registered. Please try logging in instead.' };
        }
        if (error.message.includes('Password should be')) {
          return { error: 'Password must be at least 6 characters long.' };
        }
        if (error.message.includes('Invalid email')) {
          return { error: 'Please enter a valid email address.' };
        }
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'Something went wrong. Please try again.' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Return user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          return { error: 'Wrong email or password. Please check and try again.' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { error: 'Please check your email and click the confirmation link.' };
        }
        if (error.message.includes('Invalid email')) {
          return { error: 'Please enter a valid email address.' };
        }
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'Something went wrong. Please try again.' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`,
      });

      if (error) {
        if (error.message.includes('Invalid email')) {
          return { error: 'Please enter a valid email address.' };
        }
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'Something went wrong. Please try again.' };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}