// ===== COMMENTED OUT ORIGINAL CODE =====
// import { Alert, Button, NumberInput, TextInput } from "@mantine/core";
// import { useMutation } from "@tanstack/react-query";
// import { Check } from "lucide-react";
// import { usePartner } from "@/lib/hooks";
// import { GenericError, GenericResponse } from "../lib/types";
// import { AxiosError } from "axios";
// import { mutationErrorHandler } from "../lib/utils";
// import { toast } from "react-toastify";
// import {Link,  Navigate, useNavigate} from 'react-router-dom';
// import { useState } from "react";
// import { Input } from "@/components1/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components1/ui/select";
// import { Checkbox } from "@/components1/ui/checkbox";
// import {api} from "@/lib/api";
// import SignupLayout from "@/components1/ui/SignupLayout";

// ===== NEW IMPLEMENTATION =====
import { Button } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { usePartner } from "@/lib/hooks";
import { GenericError, GenericResponse } from "../lib/types";
import { mutationErrorHandler } from "../lib/utils";
import { Input } from "@/components1/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components1/ui/select";
import { Checkbox } from "@/components1/ui/checkbox";
import SignupLayout from "@/components1/ui/SignupLayout";


// ===== COMMENTED OUT ORIGINAL TYPES =====
// type EduType = "UG" | "PG" | "PhD";
// type PartnerSignUpForm = {
//   firstName: string;
//   domain: string;
//   email: string;
//   password?: string;
//   companyName?: string;
//   gstNo?: string;
//   mobile: string;
//   eduType: EduType;
//   department: string;
//   collegeName: string;
//   yearInCollege?: number;
//   collegeCity: string;
//   dob: Date | null;
//   linkedin: string;
//   state?: string;
//   city?: string;
//   pincode?: string;
//   country?: string;
//   signUpAs?: "individual" | "institute";
//   otp?: string;
//   topic?: string;
//   sector?: string;
//   acceptTerms?: boolean;
//   addressLine1?: string;
//   addressLine2?: string;
// }

// ===== NEW TYPES (MERGED FROM PARTNER SIGNUP) =====
type CampusAmbassadorForm = {
  companyName?: string;
  email: string;
  cinOrGst?: string;
  instructorName: string;
  phone: string;
  addressLine1?: string;
  addressLine2?: string;
  acceptTerms: boolean;
  password: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  signUpAs: "individual" | "institution";
  trainingTopics?: string[];
  // Additional Campus Ambassador specific fields
  domain?: string;
  otp?: string;
  topic?: string;
  sector?: string;
};


// ===== COMMENTED OUT ORIGINAL HOOK =====
// function usePartnerSignUp() {
//   const navigate = useNavigate();
//   return useMutation<
//     GenericResponse,
//     AxiosError<GenericError>,
//     PartnerSignUpForm,
//     unknown
//   >({
//     mutationFn: async (data: PartnerSignUpForm) => {
//       const response = await api().post("/partner/auth/register", data);
//       return response.data;
//     },
//     onSuccess: () => {
//       toast.success("Registration successful!");
//       navigate("/partner/signin");
//     },
//     onError: (err) => mutationErrorHandler(err),
//   });
// }

// ===== NEW HOOK (CORRECT BACKEND CONNECTIVITY) =====
function useCampusAmbassadorSignUp() {
  const navigate = useNavigate();
  return useMutation<
    GenericResponse,
    AxiosError<GenericError>,
    CampusAmbassadorForm,
    unknown
  >({
    mutationFn: async (data: CampusAmbassadorForm) => {
      const response = await api().post("/partner/auth/register", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/partner-signin");
    },
    onError: (err) => mutationErrorHandler(err),
  });
}

const PartnerInstitutionPortal = () => {
  const { user } = usePartner();
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState<CampusAmbassadorForm>({
    companyName: "",
    email: "",
    cinOrGst: "",
    instructorName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    acceptTerms: false,
    password: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    signUpAs: "institution",
    trainingTopics: [],
    domain: "",
    otp: "",
    topic: "",
    sector: "",
  });

  const registerMutation = useCampusAmbassadorSignUp();

  // Redirect if user is already logged in
  if (user) return <Navigate to={"/partner"} />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptTerms: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      return toast.error("Accept terms to continue!");
    }
    
    // Set signUpAs to institution
    const finalData = {
      ...formData,
      signUpAs: "institution" as const
    };
    
    registerMutation.mutate(finalData);
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

  const sendOTP = () => {
    if (formData.phone && formData.phone.length >= 10) {
      setOtpSent(true);
      console.log("Sending OTP to:", formData.phone);
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
              Company Information
            </div>
            
            <div>
              <Input
                placeholder="Enter your company name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="bg-white/80 rounded-xl"
              />
            </div>
            
            <div>
              <Input
                placeholder="Enter your GST"
                name="cinOrGst"
                value={formData.cinOrGst}
                onChange={handleChange}
                className="bg-white/80 rounded-xl"
              />
            </div>
            
            <div>
              <Input
                placeholder="Enter your name"
                name="instructorName"
                value={formData.instructorName}
                onChange={handleChange}
                className="bg-white/80 rounded-xl"
              />
            </div>
            
            <div>
              <Select value={formData.state} onValueChange={(value) => handleSelectChange('state', value)}>
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
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="bg-white/80 rounded-xl"
              />
            </div>
            
            <div>
              <Input
                placeholder="Enter pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="bg-white/80 rounded-xl"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-right text-sm text-gray-600 mb-4">
              Contact & Address Details
            </div>
            
            <div>
              <Input
                placeholder="Address Line 1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="bg-white/80 rounded-xl"
              />
            </div>
            
            <div>
              <Input
                placeholder="Address Line 2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="bg-white/80 rounded-xl"
              />
            </div>
            
            <div>
              <Select value={formData.country} onValueChange={(value) => handleSelectChange('country', value)}>
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-white/80 rounded-xl flex-1"
              />
              <Button 
                type="button" 
                onClick={sendOTP}
                className="bg-[#0389FF] hover:bg-[#0389FF]/90 rounded-xl"
                disabled={!formData.phone || formData.phone.length < 10}
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
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="bg-white/80 rounded-xl"
                />
              </div>
            )}
            <div>
              <Input
                placeholder="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/80 rounded-xl"
              />
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
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white/80 rounded-xl"
              />
            </div>

            <div>
              <Select value={formData.topic} onValueChange={(value) => handleSelectChange('topic', value)}>
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
              <Select value={formData.sector} onValueChange={(value) => handleSelectChange('sector', value)}>
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
                onCheckedChange={handleCheckboxChange}
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Partner With Us - Institution</h1>
          
          <p className="text-gray-600 text-sm">
            {currentStep === 1 && "Enter your company details to proceed further"}
            {currentStep === 2 && "Enter your contact & address details to proceed further"}
            {currentStep === 3 && "Accept terms and conditions to complete signup"}
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
                disabled={!formData.acceptTerms || registerMutation.isPending}
              >
                {registerMutation.isPending ? "SIGNING UP..." : "SIGN UP"}
              </Button>
            )}
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/partner-signin" className="text-[#0389FF] hover:text-[#0389FF]/80 hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </SignupLayout>
  );
};

export default PartnerInstitutionPortal;

