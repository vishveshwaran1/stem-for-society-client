import React, { useState } from 'react';
import { usePartner } from '@/lib/hooks';
import { Button } from '@/components1/ui/button';
import { Input } from '@/components1/ui/input';
import { Checkbox } from '@/components1/ui/checkbox';
import { Mail, User } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

type PartnerSignInForm = {
  email: string;
  password: string;
};

const InstitutionLogin = () => {
  const { user } = usePartner();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PartnerSignInForm>({
    email: '',
    password: '',
  });

  const { signIn, isSigningIn } = usePartner({
    extraOnSuccess: () => navigate('/partner'), // old design redirect
  });

  const [rememberPassword, setRememberPassword] = useState(false);

  const handleSubmit = (event?: React.FormEvent) => {
    if (event) event.preventDefault(); // prevent reload
    signIn(formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (user) return <Navigate to="/partner" />;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url('/lovable-uploads/cc0094aa-ced3-4e50-b5f1-d61b7b6d2988.png')`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen relative z-10">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-12">
          <img
            src="/lovable-uploads/ceabc523-dba1-475b-b670-7ed6b88782a1.png"
            alt="STEM for Society Logo"
            className="h-48 w-48 lg:h-64 lg:w-64 mb-8 drop-shadow-2xl"
          />
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">STEM FOR SOCIETY</h1>
          <p className="text-xl text-white/95 drop-shadow-md">Partner with us to transform education!</p>
        </div>

        {/* Right Side */}
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl m-8 flex flex-col justify-center px-8 py-12">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-md">
                Partner with us
              </h2>
              <p className="text-white/90">Enter your credentials to proceed further</p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-[#0389FF] focus:border-transparent shadow-lg"
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-[#0389FF] focus:border-transparent shadow-lg"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberPassword}
                    onCheckedChange={(checked) => setRememberPassword(checked as boolean)}
                    className="data-[state=checked]:bg-[#0389FF] data-[state=checked]:border-[#0389FF] border-white/50 bg-white/30"
                  />
                  <label htmlFor="remember" className="text-sm text-white/90">
                    Remember Password
                  </label>
                </div>
                <button type="button" className="text-sm text-[#0389FF] hover:text-[#0389FF]/80 font-medium">
                  Forget Password?
                </button>
              </div>

              <Button
                className="w-full bg-[#0389FF] hover:bg-[#0389FF]/90 text-white py-3 rounded-xl font-semibold shadow-lg"
                disabled={isSigningIn}
                type="submit"
              >
                LOGIN
              </Button>
            </form>

            {/* Divider */}
            <div className="text-center py-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/20 text-white/80 rounded-full backdrop-blur-sm">
                    or sign in with
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-center space-x-3">
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
                  {/* Google icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
                  <Mail className="w-5 h-5 text-[#0389FF]" />
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
                  <User className="w-5 h-5 text-[#0389FF]" />
                </button>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center">
              <span className="text-white/90 text-sm">
                Want to partner with us?{' '}
                <Link to="/campus-ambassador-signup" className="text-[#0389FF] hover:text-[#0389FF]/80 font-medium underline">
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen flex flex-col relative z-10">
        {/* Logo */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12">
          <img
            src="/lovable-uploads/ceabc523-dba1-475b-b670-7ed6b88782a1.png"
            alt="STEM for Society Logo"
            className="h-32 w-32 mb-6 drop-shadow-2xl"
          />
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">STEM FOR SOCIETY</h1>
          <p className="text-lg text-white/95 drop-shadow-md">Partner with us to transform education!</p>
        </div>

        {/* Form */}
        <div className="bg-white/20 backdrop-blur-lg border-t border-white/30 rounded-t-3xl shadow-2xl px-6 py-8">
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                Partner with us
              </h2>
              <p className="text-white/90 text-sm">
                Enter your credentials to proceed further
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-[#0389FF] focus:border-transparent shadow-lg"
              />

              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-[#0389FF] focus:border-transparent shadow-lg"
              />

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-mobile"
                    checked={rememberPassword}
                    onCheckedChange={(checked) => setRememberPassword(checked as boolean)}
                    className="data-[state=checked]:bg-[#0389FF] data-[state=checked]:border-[#0389FF] border-white/50 bg-white/30"
                  />
                  <label htmlFor="remember-mobile" className="text-sm text-white/90">
                    Remember
                  </label>
                </div>
                <button type="button" className="text-sm text-[#0389FF] hover:text-[#0389FF]/80 font-medium">
                  Forgot?
                </button>
              </div>

              <Button
                className="w-full bg-[#0389FF] hover:bg-[#0389FF]/90 text-white py-3 rounded-xl font-semibold shadow-lg"
                disabled={isSigningIn}
                type="submit"
              >
                LOGIN
              </Button>
            </form>

            {/* Social Login */}
            <div className="text-center py-4">
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/20 text-white/80 rounded-full backdrop-blur-sm">
                    or sign in with
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-3">
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
                  <Mail className="w-5 h-5 text-[#0389FF]" />
                </button>
                <button className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg">
                  <User className="w-5 h-5 text-[#0389FF]" />
                </button>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center">
              <span className="text-white/90 text-sm">
                Want to partner with us?{' '}
                <Link to="/campus-ambassador-signup" className="text-[#0389FF] hover:text-[#0389FF]/80 font-medium underline">
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionLogin;
