import React, { useState } from 'react';
import Header from '@/components1/Header';
import GridBackground from '@/components1/GridBackground';
import { Button } from '@/components1/ui/button';
import { Input } from '@/components1/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components1/ui/select';
import { ArrowLeft, Share2, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CampusAmbassadorBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    educationLevel: '',
    department: '',
    dateOfBirth: '',
    currentYear: '',
    linkedinProfile: '',
    email: '',
    country: '',
    mobileNumber: '',
    otp: '',
    institutionName: '',
    manualInstitutionName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: ''
  });

  const [emailVerified, setEmailVerified] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepTitles = [
    'Personal Information',
    'Contact Information', 
    'Institution information'
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-8 mb-12">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === currentStep 
              ? 'bg-blue-500 text-white' 
              : step < currentStep 
                ? 'bg-gray-300 text-gray-600'
                : 'bg-gray-200 text-gray-500'
          }`}>
            {step}
          </div>
          {step === currentStep && (
            <div className="text-blue-500 text-sm font-medium ml-3">
              {stepTitles[step - 1]}
            </div>
          )}
          {step < 3 && (
            <div className="w-16 h-px bg-gray-300 ml-3"></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
        <Input
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select onValueChange={(value) => handleInputChange('educationLevel', value)}>
          <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="Education Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="undergraduate">Undergraduate</SelectItem>
            <SelectItem value="graduate">Graduate</SelectItem>
            <SelectItem value="postgraduate">Postgraduate</SelectItem>
            <SelectItem value="phd">PhD</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleInputChange('department', value)}>
          <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="computer-science">Computer Science</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="biology">Biology</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />

        <Select onValueChange={(value) => handleInputChange('currentYear', value)}>
          <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="Your Current year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1st-year">1st Year</SelectItem>
            <SelectItem value="2nd-year">2nd Year</SelectItem>
            <SelectItem value="3rd-year">3rd Year</SelectItem>
            <SelectItem value="4th-year">4th Year</SelectItem>
            <SelectItem value="graduate">Graduate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          placeholder="Linkedin Profile"
          value={formData.linkedinProfile}
          onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="relative">
        <Input
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500 pr-12"
        />
        {emailVerified && (
          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
          <span className="text-yellow-800 text-sm">
            Check your inbox and click the verification link.
          </span>
        </div>
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6"
          onClick={() => setEmailVerified(true)}
        >
          Authenticate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select onValueChange={(value) => handleInputChange('country', value)}>
          <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="in">India</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="md:col-span-2">
          <Input
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
          <span className="text-yellow-800 text-sm">
            Enter the OTP sent to your mobile number.
          </span>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
          Send OTP
        </Button>
      </div>

      <div>
        <Input
          placeholder="Send OTP"
          value={formData.otp}
          onChange={(e) => handleInputChange('otp', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Select onValueChange={(value) => handleInputChange('institutionName', value)}>
          <SelectTrigger className="w-full h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="Select Institution name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mit">MIT</SelectItem>
            <SelectItem value="stanford">Stanford University</SelectItem>
            <SelectItem value="harvard">Harvard University</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <Input
          placeholder="Enter the Institution name"
          value={formData.manualInstitutionName}
          onChange={(e) => handleInputChange('manualInstitutionName', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
          <span className="text-yellow-800 text-xs">
            Select your institution from list or enter manually if not listed.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Address line 1"
          value={formData.addressLine1}
          onChange={(e) => handleInputChange('addressLine1', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
        <Input
          placeholder="Address line 2"
          value={formData.addressLine2}
          onChange={(e) => handleInputChange('addressLine2', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select onValueChange={(value) => handleInputChange('city', value)}>
          <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="los-angeles">Los Angeles</SelectItem>
            <SelectItem value="chicago">Chicago</SelectItem>
            <SelectItem value="boston">Boston</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleInputChange('state', value)}>
          <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ny">New York</SelectItem>
            <SelectItem value="ca">California</SelectItem>
            <SelectItem value="il">Illinois</SelectItem>
            <SelectItem value="ma">Massachusetts</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="relative overflow-hidden min-h-screen"style={{ height: '100%', minHeight: '100%' }}
>
  {/* Grid background */}
  <div 
    className="absolute inset-0 opacity-50 pointer-events-none z-0"
    style={{
      minHeight: '100vh',
      backgroundImage: `
        linear-gradient(rgba(107,114,128,0.5) 2px, transparent 2px),
        linear-gradient(90deg, rgba(107,114,128,0.5) 2px, transparent 2px)
      `,
      backgroundSize: '100px 100px',
     WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 35%, transparent 100%)',
maskImage: 'linear-gradient(to bottom, black 0%, transparent 35%, transparent 100%)',


      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%',
    }}
  />

  {/* Content above grid */}
  <div className="relative z-10">
    <Header />

    {/* Navigation Bar */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 bg-[#0389FF] text-white border-[#0389FF] rounded-full px-4 hover:bg-[#0389FF]/90"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 bg-[#0389FF] text-white border-[#0389FF] rounded-full px-4 hover:bg-[#0389FF]/90"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>
    </div>
       <div className="text-center mb-8">
          <h1 className="text-xl font-medium text-gray-900 mb-2">Book your Session</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            <span className="text-yellow-500">Campus Ambassador Program!</span>
          </h2>
        </div>
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       

        {renderStepIndicator()}

        <div className="bg-white rounded-2xl p-8 shadow-sm min-h-96">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        <div className="flex justify-end mt-8">
          <Button 
            onClick={nextStep}
            disabled={currentStep === 3}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-medium"
          >
            CONTINUE
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="w-10 h-10  rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-900 font-bold text-lg"><img 
                    src="/lovable-uploads/FooterLogo.png" 
                    alt="STEM for Society Logo" 
                    className="w-full h-full object-contain"
                  /></span>
            </div>
            <div>
              <h4 className="text-xl font-bold">STEM FOR SOCIETY</h4>
              <p className="text-blue-200 text-sm">Let's innovate, incubate and impact the world together!</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CampusAmbassadorBooking;
