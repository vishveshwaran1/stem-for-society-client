import React, { useState } from 'react';
import Header from '@/components1/Header';
import { Button } from '@/components1/ui/button';
import { Input } from '@/components1/ui/input';
import { Card } from '@/components1/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components1/ui/select';
import { ArrowLeft, Share2, Check, Shield, Leaf, ChevronLeft, ChevronRight, AlertCircle, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { GenericError, GenericResponse } from '../lib/types';
import { AxiosError } from 'axios';
import { api } from '../lib/api';
import { toast } from 'react-toastify';
import { mutationErrorHandler } from '../lib/utils';
import Footer from '@/components1/Footer';

// Backend form data type (what gets sent to backend)
type PsychologyBookingForm = {
  firstName: string;
  lastName?: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  age: string;
  concerns: string;
  idCard?: File | null;
};

// All form data type 
interface FormData {
  // Backend fields
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  age: string;
  concerns: string;
  idCard: File | null;
  
  // Frontend-only fields (not sent to backend)
  selectedDate: Date | null;
  selectedTime: string;
}

// Custom hook for booking psychology session
function useBookPsychologySession() {
  return useMutation<
    GenericResponse,
    AxiosError<GenericError>,
    PsychologyBookingForm,
    unknown
  >({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      if (data.lastName) {
        formData.append("lastName", data.lastName);
      }
      if (data.idCard) {
        formData.append("idCard", data.idCard);
      }
      formData.append("mobile", data.mobile);
      formData.append("email", data.email);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("age", data.age);
      formData.append("concerns", data.concerns);

      const response = await api().post("/enquiry/psychology", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onError: (err) => mutationErrorHandler(err),
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
}

const PsychologyBookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { mutate: bookSession, isPending } = useBookPsychologySession();
  
  const [formData, setFormData] = useState<FormData>({
    // Backend fields
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    city: '',
    state: '',
    age: '',
    concerns: '',
    idCard: null,
    
    // Frontend-only fields
    selectedDate: null,
    selectedTime: '4:30 PM',
  });

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Contact Information' },
    { number: 3, title: 'Concerns & Background' },
    { number: 4, title: 'Schedule Session' },
  ];

  const availableTimes = [
    '10:30 AM', '11:30 AM', '12:30 PM', '3:30 PM', '4:30 PM', '5:30 PM'
  ];

  const concerns = [
    'Academic Stress',
    'Anxiety',
    'Depression',
    'Relationship Issues',
    'Career Confusion',
    'Study Habits',
    'Time Management',
    'Self-Esteem Issues'
  ];

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!formData.firstName || !formData.age || !formData.city || !formData.state) {
        toast.error("Please fill all required fields");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.email || !formData.mobile) {
        toast.error("Please fill all required fields");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.concerns) {
        toast.error("Please select your primary concern");
        return;
      }
    }

    if (currentStep === 4) {
      handleSubmit();
    } else if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const updateFormData = (field: string, value: string | File | Date | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle calendar date selection and sync with dropdown
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    updateFormData('selectedDate', date);
  };

  // Handle dropdown date selection and sync with calendar
  const handleDropdownDateSelect = (value: string) => {
    const date = new Date(value);
    setSelectedDate(date);
    updateFormData('selectedDate', date);
    
    // Update calendar month to show the selected date
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth()));
  };

  // Handle file upload for ID card
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      
      // Validate file type (only images)
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file only");
        return;
      }
      
      setFormData(prev => ({ ...prev, idCard: file }));
      toast.success("ID card uploaded successfully");
    }
  };

  // Generate available dates for dropdown (next 30 days only)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const oneMonthFromToday = new Date(today);
    oneMonthFromToday.setMonth(today.getMonth() + 1);
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Only include dates within one month
      if (date <= oneMonthFromToday) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates;
  };

  const calculatePrice = () => {
    return formData.idCard ? 1000 : 2000; // 75% discount for students
  };

  const handleSubmit = () => {
    // Prepare data for backend (exclude frontend-only fields)
    const backendData: PsychologyBookingForm = {
      firstName: formData.firstName,
      lastName: formData.lastName || undefined,
      email: formData.email,
      mobile: formData.mobile,
      city: formData.city,
      state: formData.state,
      age: formData.age,
      concerns: formData.concerns,
      idCard: formData.idCard || undefined,
    };

    bookSession(backendData);
    setCurrentStep(5); // Move to success step
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            currentStep === step.number 
              ? "bg-[#0389FF] text-white" 
              : currentStep > step.number 
                ? "bg-[#0389FF] text-white"
                : "bg-gray-200 text-gray-600"
          )}>
            {step.number}
          </div>
          {currentStep === step.number && (
            <span className="ml-3 text-gray-700 font-medium">{step.title}</span>
          )}
          {index < steps.length - 1 && (
            <div className="w-16 h-0.5 bg-gray-200 mx-4"></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="First Name *"
          value={formData.firstName}
          onChange={(e) => updateFormData('firstName', e.target.value)}
          className="bg-gray-100 border-0 h-12"
          required
        />
        <Input
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => updateFormData('lastName', e.target.value)}
          className="bg-gray-100 border-0 h-12"
        />
      </div>
      <Input
        placeholder="Age *"
        value={formData.age}
        onChange={(e) => updateFormData('age', e.target.value)}
        className="bg-gray-100 border-0 h-12"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="City *"
          value={formData.city}
          onChange={(e) => updateFormData('city', e.target.value)}
          className="bg-gray-100 border-0 h-12"
          required
        />
        <Input
          placeholder="State *"
          value={formData.state}
          onChange={(e) => updateFormData('state', e.target.value)}
          className="bg-gray-100 border-0 h-12"
          required
        />
      </div>
    </div>
  );

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderContactInfo = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3">
        <Shield className="h-5 w-5 text-yellow-600" />
        <span className="text-yellow-800 font-medium">Your identity will be 100% confidential</span>
      </div>
      
      <Input
        placeholder="Email *"
        type="email"
        value={formData.email}
        onChange={(e) => updateFormData('email', e.target.value)}
        className="bg-gray-100 border-0 h-12"
        required
      />
      <Input
        placeholder="Mobile Number *"
        value={formData.mobile}
        onChange={(e) => updateFormData('mobile', e.target.value)}
        className="bg-gray-100 border-0 h-12"
        required
      />
      
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Student ID Card (Optional - for 50% discount)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="mb-4">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 mb-2">
              {formData.idCard ? (
                <span className="text-green-600 font-medium">
                  ✓ {formData.idCard.name} ({(formData.idCard.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              ) : (
                'Upload ID card (within 5MB, image format only)'
              )}
            </p>
          </div>
          
          {/* Fixed file input - removed Button wrapper */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="id-upload"
          />
          <label 
            htmlFor="id-upload" 
            className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
              formData.idCard 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {formData.idCard ? 'Change File' : 'Choose File'}
          </label>
          
          {formData.idCard && (
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, idCard: null }))}
              className="ml-2 text-red-600 hover:text-red-700 underline text-sm"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      
      {formData.idCard && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
          <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
          <div className="text-green-800 text-sm">
            <p className="font-medium">50% fee waived off with valid student ID!</p>
            <p className="text-xs mt-1">Fee reduced from ₹2,000 to ₹1,000</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderConcerns = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">What brings you here today?</h2>
      
      <Select value={formData.concerns} onValueChange={(value) => updateFormData('concerns', value)}>
        <SelectTrigger className="bg-gray-100 border-0 h-12">
          <SelectValue placeholder="Select your primary concern *" />
        </SelectTrigger>
        <SelectContent>
          {concerns.map((concern) => (
            <SelectItem key={concern} value={concern}>{concern}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <div className="text-3xl font-bold text-teal-600 mb-2">₹ {calculatePrice().toLocaleString()}.00</div>
        <div className="text-gray-600">30-minute confidential session</div>
        {formData.idCard && (
          <div className="text-green-600 text-sm mt-1">Student discount applied!</div>
        )}
      </div>
    </div>
  );

  const renderScheduleSession = () => {
    const today = new Date();
    const oneMonthFromToday = new Date(today);
    oneMonthFromToday.setMonth(today.getMonth() + 1);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-medium">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4 text-center text-sm text-gray-500">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - 6);
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === new Date().toDateString();
              const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0));
              const isAfterOneMonth = date > oneMonthFromToday;
              const isDisabled = !isCurrentMonth || isPastDate || isAfterOneMonth;
              
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (!isDisabled) {
                      handleDateSelect(date);
                    }
                  }}
                  className={`p-2 text-sm rounded-lg transition-colors ${
                    isDisabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : isSelected
                        ? 'bg-teal-500 text-white'
                        : isToday
                          ? 'bg-teal-100 text-teal-600'
                          : 'hover:bg-gray-100'
                  }`}
                  disabled={isDisabled}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
          
          <div className="mt-4 text-xs text-gray-500 text-center">
            Available dates: Today to {oneMonthFromToday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <Select 
              value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} 
              onValueChange={handleDropdownDateSelect}
            >
              <SelectTrigger className="w-full h-12 bg-gray-100 border-0 text-gray-700">
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent>
                {generateAvailableDates().map((date) => (
                  <SelectItem key={date.value} value={date.value}>
                    {date.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Available Time</h4>
            <div className="grid grid-cols-2 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => updateFormData('selectedTime', time)}
                  className={`p-3 text-sm rounded-lg border transition-colors ${
                    formData.selectedTime === time
                      ? 'bg-teal-500 text-white border-teal-500'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-yellow-800 text-sm">
              We will be contacting you within 48 hrs of your registration
            </span>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-yellow-800 text-sm">
              Note: Selected date and time are for reference only. Final scheduling will be confirmed via contact.
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="text-center space-y-8">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Registration Successful</h2>
          <p className="text-gray-600 max-w-md">
            Your psychology counselling request has been submitted. We will contact you within 48 hours to confirm your session.
          </p>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button 
          variant="outline" 
          className="px-8 h-12"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden min-h-screen" style={{ height: '100%', minHeight: '100%' }}>
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
                  className="flex items-center space-x-2 text-white border-[#00549FB8] rounded-full px-4 hover:bg-[#00549FB8]/90"
                  style={{ backgroundColor: '#00549FB8' }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
              </Link>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 text-white border-[#00549FB8] rounded-full px-4 hover:bg-[#00549FB8]/90"
                style={{ backgroundColor: '#00549FB8' }}
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-xl font-medium text-gray-600 mb-2">Book your Session</h1>
            <h2 className="text-4xl font-bold text-gray-900">
              <span className="text-teal-500">Mental</span> WellBeing
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep <= 4 && renderStepIndicator()}

        <Card className="p-8 shadow-sm">
          {currentStep === 1 && renderPersonalInfo()}
          {currentStep === 2 && renderContactInfo()}
          {currentStep === 3 && renderConcerns()}
          {currentStep === 4 && renderScheduleSession()}
          {currentStep === 5 && renderSuccess()}
        </Card>

        {/* Updated button section with Back and Continue buttons */}
        {currentStep <= 4 && (
          <div className="flex justify-between items-center mt-8">
            {/* Back Button */}
            <Button 
              onClick={handleBack}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg font-semibold h-12"
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              BACK
            </Button>

            {/* Continue Button */}
            <Button 
              onClick={nextStep}
              className="bg-[#0389FF] hover:bg-[#0389FF]/90 text-white px-8 py-3 text-lg font-semibold h-12"
              disabled={isPending}
            >
              {currentStep === 4 ? (isPending ? 'SUBMITTING...' : 'SUBMIT REQUEST') : 'CONTINUE'}
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
            <footer className="bg-blue-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-900 font-bold text-lg">
                <img 
                  src="/lovable-uploads/FooterLogo.png" 
                  alt="STEM for Society Logo" 
                  className="w-full h-full object-contain"
                />
              </span>
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

export default PsychologyBookingFlow