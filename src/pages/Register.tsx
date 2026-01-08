import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity, Shield, Zap, Eye, EyeOff, Check } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!passwordStrength.hasMinLength || !passwordStrength.hasUppercase || !passwordStrength.hasNumber) {
      setError('Please meet all password requirements');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Activity className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-display font-bold text-primary-foreground">ForecastAI</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-display font-bold text-primary-foreground leading-tight mb-4">
              Start Your<br />Forecasting Journey
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              Join thousands of healthcare professionals using AI to predict and optimize medicine demand.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Enterprise Security</h3>
                <p className="text-sm text-primary-foreground/70">Bank-grade encryption for your data</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Instant Setup</h3>
                <p className="text-sm text-primary-foreground/70">Get started in under 2 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-40 right-40 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">ForecastAI</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Create account</h2>
            <p className="text-muted-foreground">Start forecasting medicine demand today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-slide-up">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 px-4 bg-card border-border focus:border-primary focus:ring-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 px-4 bg-card border-border focus:border-primary focus:ring-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 px-4 pr-12 bg-card border-border focus:border-primary focus:ring-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password requirements */}
              <div className="mt-3 space-y-2">
                <div className={`flex items-center gap-2 text-xs ${passwordStrength.hasMinLength ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Check className={`w-3.5 h-3.5 ${passwordStrength.hasMinLength ? 'opacity-100' : 'opacity-40'}`} />
                  At least 8 characters
                </div>
                <div className={`flex items-center gap-2 text-xs ${passwordStrength.hasUppercase ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Check className={`w-3.5 h-3.5 ${passwordStrength.hasUppercase ? 'opacity-100' : 'opacity-40'}`} />
                  One uppercase letter
                </div>
                <div className={`flex items-center gap-2 text-xs ${passwordStrength.hasNumber ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Check className={`w-3.5 h-3.5 ${passwordStrength.hasNumber ? 'opacity-100' : 'opacity-40'}`} />
                  One number
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-12 px-4 bg-card border-border focus:border-primary focus:ring-primary transition-colors"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold text-base shadow-medium transition-all duration-300 hover:shadow-strong"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Already have an account?{' '}
            <Link to="/" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
