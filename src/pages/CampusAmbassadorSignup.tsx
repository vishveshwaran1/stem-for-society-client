
import { useState } from "react";
import { Button } from "@/components1/ui/button";
import { Input } from "@/components1/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components1/ui/select";
import { Checkbox } from "@/components1/ui/checkbox";
import { Link } from "react-router-dom";
import SignupLayout from "@/components1/ui/SignupLayout";

const CampusAmbassadorSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    name: "",
    domain: "",
    state: "",
    city: "",
    pincode: "",
    
    // Step 2: Contact Details
    country: "India",
    mobile: "",
    otp: "",
    email: "",
    
    // Step 3: Teaching Details
    topic: "",
    sector: "",
    acceptTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Campus Ambassador signup:", formData);
  };

  const sendOTP = () => {
    if (formData.mobile && formData.mobile.length >= 10) {
      setOtpSent(true);
      console.log("Sending OTP to:", formData.mobile);
    }
  };

  const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => (
    <div className="flex justify-center mb-6">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isActive 
                  ? 'bg-[#0389FF] text-white' 
                  : isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div className={`w-16 h-0.5 ${
                  isCompleted || stepNumber === currentStep 
                    ? 'bg-[#0389FF] bg-opacity-30' 
                    : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-right text-sm text-gray-600 mb-4">
              Personal Information
            </div>
            
            <div>
              <Input
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white/80 rounded-xl"
              />
            </div>
            
            <div>
              <Select value={formData.domain} onValueChange={(value) => handleInputChange('domain', value)}>
                <SelectTrigger className="bg-white/80 rounded-xl">
                  <SelectValue placeholder="Select your domain" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="engineering" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"

>Engineering</SelectItem>
                  <SelectItem value="technology" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"

>Technology</SelectItem>
                  <SelectItem value="science" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"

>Science</SelectItem>
                  <SelectItem value="mathematics" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger className="bg-white/80 rounded-xl">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="maharashtra" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Maharashtra</SelectItem>
                  <SelectItem value="karnataka" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Karnataka</SelectItem>
                  <SelectItem value="tamil-nadu" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Tamil Nadu</SelectItem>
                  <SelectItem value="gujarat" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Gujarat</SelectItem>
                  <SelectItem value="delhi" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Delhi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Input
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="bg-white/80 rounded-xl"
              />
            </div>
            
            <div>
              <Input
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className="bg-white/80 rounded-xl"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-right text-sm text-gray-600 mb-4">
              Contact Details
            </div>
            
            <div>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger className="bg-white/80 rounded-xl">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="India"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>India</SelectItem>
                  <SelectItem value="USA"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>United States</SelectItem>
                  <SelectItem value="UK"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>United Kingdom</SelectItem>
                  <SelectItem value="Canada"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                className="bg-white/80 rounded-xl flex-1"
              />
              <Button 
                type="button" 
                onClick={sendOTP}
                className="bg-[#0389FF] hover:bg-[#0389FF]/90 rounded-xl"
                disabled={!formData.mobile || formData.mobile.length < 10}
              >
                Send OTP
              </Button>
            </div>
            
            {otpSent && (
              <div className="bg-yellow-100 p-3 rounded-xl flex items-center justify-between">
                <span className="text-sm">⚠️ OTP sent to entered number</span>
              </div>
            )}
            
            {otpSent && (
              <div>
                <Input
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={(e) => handleInputChange('otp', e.target.value)}
                  className="bg-white/80 rounded-xl"
                />
              </div>
            )}
            
            <div>
              <Input
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-white/80 rounded-xl"
              />
            </div>
            
            <div className="text-center text-sm text-gray-600">
              — or sign up with —
            </div>
            
            <div className="flex justify-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                G
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                L
              </button>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                F
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-right text-sm text-gray-600 mb-4">
              Teaching Details
            </div>
            
            <div>
              <Select value={formData.topic} onValueChange={(value) => handleInputChange('topic', value)}>
                <SelectTrigger className="bg-white/80 rounded-xl">
                  <SelectValue placeholder="Which topic do you want to teach?" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="programming" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Programming & Coding</SelectItem>
                  <SelectItem value="data-science"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Data Science</SelectItem>
                  <SelectItem value="ai-ml"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>AI & Machine Learning</SelectItem>
                  <SelectItem value="robotics"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Robotics</SelectItem>
                  <SelectItem value="web-development"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Web Development</SelectItem>
                  <SelectItem value="mobile-development"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Mobile Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                <SelectTrigger className="bg-white/80 rounded-xl">
                  <SelectValue placeholder="Which sector do you want to work in?" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="education" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Education</SelectItem>
                  <SelectItem value="healthcare" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Healthcare</SelectItem>
                  <SelectItem value="finance"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Finance</SelectItem>
                  <SelectItem value="technology"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Technology</SelectItem>
                  <SelectItem value="manufacturing"className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Manufacturing</SelectItem>
                  <SelectItem value="agriculture" className="bg-white text-black rounded-xl 
            data-[highlighted]:bg-white data-[highlighted]:text-black data-[highlighted]:rounded-xl 
            data-[state=checked]:bg-[#0389FF] data-[state=checked]:text-white"
>Agriculture</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-[#0389FF] hover:underline">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#0389FF] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SignupLayout 
      title="Innovate, Incubate and Impact the world together!" 
      subtitle="Join us to Innovate, Incubate and Impact!"
    >
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Campus Ambassador</h1>
          <p className="text-gray-600 text-sm">
            {currentStep === 1 && "Enter your personal details to proceed further"}
            {currentStep === 2 && "Enter your contact details to proceed further"}
            {currentStep === 3 && "Enter your teaching preferences to proceed further"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <StepIndicator currentStep={currentStep} totalSteps={3} />
          
          {renderStepContent()}

          <div className="flex justify-between space-x-4">
            {currentStep > 1 && (
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                className="px-6 rounded-xl border-[#0389FF] text-[#0389FF] hover:bg-[#0389FF] hover:text-white"
              >
                Back
              </Button>
            )}
            
            <div className="flex-1" />
            
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-[#0389FF] hover:bg-[#0389FF]/90 text-white px-6 rounded-xl"
              >
                CONTINUE
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-[#0389FF] hover:bg-[#0389FF]/90 text-white px-6 rounded-xl"
                disabled={!formData.acceptTerms}
              >
                SIGN UP
              </Button>
            )}
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0389FF] hover:text-[#0389FF]/80 hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </SignupLayout>
  );
};

export default CampusAmbassadorSignup;
