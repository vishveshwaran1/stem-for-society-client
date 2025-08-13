
import React from "react";

interface SignupLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  formBackgroundColor?: boolean;
}

const SignupLayout = ({ children, title, subtitle, formBackgroundColor = false }: SignupLayoutProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-cover animate-subtle-zoom"
        style={{
          backgroundImage: `url("/lovable-uploads/cc0094aa-ced3-4e50-b5f1-d61b7b6d2988.png")`,
          backgroundPosition: 'center 75%',
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen relative z-10">
        {/* Left Section - Logo */}
        <div className="lg:w-1/2 relative flex items-center justify-center">
          <div className="text-center text-white">
            <img 
              src="/lovable-uploads/ceabc523-dba1-475b-b670-7ed6b88782a1.png" 
              alt="STEM for Society Logo" 
              className="h-40 w-40 md:h-56 md:w-56 lg:h-72 lg:w-72 opacity-50 mx-auto mb-8 animate-pulse-glow-delayed"
            />
            <h1 className="text-4xl font-bold mb-4">STEM FOR SOCIETY</h1>
            <p className="text-xl">
              {title ? `Join us to ${title}` : "Let's Innovate, Incubate and Impact the world together!"}
            </p>
          </div>
        </div>

        {/* Right Section - Form with 50% opacity and curved left corner */}
        <div className="lg:w-1/2 relative">
          {/* White overlay with 50% opacity and curved left corner */}
          <div className="absolute inset-0 bg-white/50 rounded-l-3xl backdrop-blur-sm"></div>
          
          {/* Form Container */}
          <div className="relative z-10 h-full min-h-screen overflow-y-auto flex items-center justify-center px-4 md:px-8 py-8">
            {formBackgroundColor ? (
              <div className="w-full max-w-md bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                {children}
              </div>
            ) : (
              <div className="w-full max-w-md">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative z-10 min-h-screen">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("/lovable-uploads/cc0094aa-ced3-4e50-b5f1-d61b7b6d2988.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Mobile Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Mobile Logo */}
          <div className="flex-1 flex items-center justify-center pt-16">
            <div className="text-center text-white">
              <img 
                src="/lovable-uploads/ceabc523-dba1-475b-b670-7ed6b88782a1.png" 
                alt="STEM for Society Logo" 
                className="h-24 w-24 mx-auto mb-4 opacity-50"
              />
              <h1 className="text-2xl font-bold mb-2">STEM FOR SOCIETY</h1>
              <p className="text-sm">
                {subtitle || "Join us to Innovate, Incubate and Impact!"}
              </p>
            </div>
          </div>
          
          {/* Mobile Form with 50% opacity and curved corners */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-white/50 rounded-t-3xl backdrop-blur-sm"></div>
            <div className="relative z-10 h-full overflow-y-auto flex items-start justify-center px-4 pt-8 pb-4">
              {formBackgroundColor ? (
                <div className="w-full max-w-sm bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  {children}
                </div>
              ) : (
                <div className="w-full max-w-sm">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLayout;
