import React, { useState, useCallback } from 'react';
import Header from '@/components1/Header';
import { Button } from '@/components1/ui/button';
import { Input } from '@/components1/ui/input';
import { Card } from '@/components1/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components1/ui/select';
import { ArrowLeft, Share2, Check, AlertTriangle, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { GenericError, GenericResponse, RazorpayOrderOptions } from '../lib/types';
import { AxiosError } from 'axios';
import { api } from '../lib/api';
import { toast } from 'react-toastify';
import { mutationErrorHandler, initializeRazorpay } from '../lib/utils';
import { RZPY_KEYID } from '../Constants';
import Footer from '@/components1/Footer';

// Backend types from Pricing.tsx
type CreatePaymentResponse = {
  orderId: string;
  amount: number;
};

// Backend form data type (what gets sent to backend)
type InstitutionSignUpForm = {
  schoolName: string;
  contactName: string;
  contactMobile: string;
  contactEmail: string;
  studentsCount: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  plan?: "Basics" | "Premium";
};

// Frontend form data type (includes UI-only fields)
interface FormData {
  // Backend fields
  schoolName: string;
  contactName: string;
  contactMobile: string;
  contactEmail: string;
  studentsCount: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  plan: "Basics" | "Premium";
  
  // Frontend-only fields (not sent to backend)
  institutionName: string;
  manualInstitutionName: string;
  firstName: string;
  lastName: string;
  country: string;
  mobileNumber: string;
  otp: string;
  otpSent: boolean;
  otpVerified: boolean;
  numberOfStudents: string;
  selectedDate: Date | null;
  selectedTime: string;
}

// Custom hook for institution signup
function useInstitutionSignUp() {
  return useMutation<
    GenericResponse<CreatePaymentResponse>,
    AxiosError<GenericError>,
    InstitutionSignUpForm,
    unknown
  >({
    mutationFn: async (data) => {
      const response = await api().post("/enquiry/plans", data);
      return response.data;
    },
    onError: (err) => mutationErrorHandler(err),
  });
}

const InstitutionBookingComplete = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { mutateAsync, isPending } = useInstitutionSignUp();
  
  const [formData, setFormData] = useState<FormData>({
    // Backend fields
    schoolName: '',
    contactName: '',
    contactMobile: '',
    contactEmail: '',
    studentsCount: 0,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    plan: 'Premium',
    
    // Frontend-only fields
    institutionName: '',
    manualInstitutionName: '',
    firstName: '',
    lastName: '',
    country: '',
    mobileNumber: '',
    otp: '',
    otpSent: false,
    otpVerified: false,
    numberOfStudents: '',
    selectedDate: null,
    selectedTime: '4:30 PM',
  });

  const steps = [
    { number: 1, title: 'Institution Information' },
    { number: 2, title: 'Point of Contact' },
    { number: 3, title: 'Student Information' },
    { number: 4, title: 'Schedule Meet' },
  ];

  const timeSlots = [
    '10:30 AM', '11:30 AM', '12:30 PM', '3:30 PM', '4:30 PM', '5:30 PM'
  ];

  const institutionOptions = [
    'MIT',
    'Stanford University',
    'Harvard University',
    'IIT Delhi',
    'IIT Bombay',
    'IIT Madras',
    'Other'
  ];

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!formData.schoolName || !formData.addressLine1 || !formData.city || !formData.state || !formData.pincode) {
        toast.error("Please fill all required fields");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.contactName || !formData.contactEmail || !formData.contactMobile) {
        toast.error("Please fill all required fields");
        return;
      }
      if (!formData.otpVerified) {
        toast.error("Please verify your mobile number with OTP");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.numberOfStudents || !formData.plan) {
        toast.error("Please fill all required fields");
        return;
      }
    }

    if (currentStep === 4) {
      handlePayment();
    } else if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string | number | Date | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle OTP sending
  const handleSendOTP = () => {
    if (!formData.contactMobile) {
      toast.error("Please enter mobile number first");
      return;
    }
    // Simulate OTP sending
    toast.success("OTP sent successfully to " + formData.contactMobile);
    updateFormData('otpSent', true);
  };

  // Handle OTP verification
  const handleVerifyOTP = () => {
    if (!formData.otp) {
      toast.error("Please enter OTP");
      return;
    }
    if (formData.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    // Simulate OTP verification
    toast.success("Mobile number verified successfully");
    updateFormData('otpVerified', true);
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
    return formData.plan === 'Premium' ? 40000 : 20000;
  };

  // Payment handler using backend logic
  const handlePayment = useCallback(async () => {
    try {
      const rzrpyInit = await initializeRazorpay();
      if (!rzrpyInit) return toast.error("Unable to initialize payment!");

      // Prepare data for backend (exclude frontend-only fields)
      const backendData: InstitutionSignUpForm = {
        schoolName: formData.schoolName,
        contactName: formData.contactName,
        contactMobile: formData.contactMobile,
        contactEmail: formData.contactEmail,
        studentsCount: parseInt(formData.numberOfStudents) || 0,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2 || undefined,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        plan: formData.plan,
      };

      const data = await mutateAsync(backendData);

      console.log("🚀 ~ handlePayment ~ data:", data);

      if (!data || !data.data) {
        toast.error("Something went wrong in creating payment!");
        return;
      }
      const order = data.data;

      const options: RazorpayOrderOptions = {
        key: RZPY_KEYID,
        amount: Number(order.amount) * 100,
        currency: "INR",
        name: "Stem for Society",
        description: `${formData.plan} plan purchase`,
        image: "https://stem-4-society.netlify.app/logo-01.png",
        order_id: order.orderId,
        prefill: {
          name: formData.contactName + " - " + formData.schoolName,
          email: formData.contactEmail,
          contact: formData.contactMobile,
        },
        async handler() {
          toast.success(
            "Payment was made successfully! We will verify the payment and will be in touch with you shortly",
            { autoClose: false, draggable: false },
          );
          setCurrentStep(5); // Move to success step
        },
      };

      // @ts-expect-error Razorpay global variable
      const rzp: RazorpayInstance = new window.Razorpay(options);

      // Razorpay event handler
      rzp.on("payment.failed", (res) => {
        console.log("Failure:", res);
        toast.error("Payment failed! Reason:\n" + res.error.description, {
          autoClose: false,
          closeOnClick: false,
        });
        toast.error(
          "Please note Order ID: " +
            res.error.metadata.order_id +
            "\n Payment ID: " +
            res.error.metadata.payment_id,
          { autoClose: false, closeOnClick: false },
        );
      });

      rzp.open();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          toast.error("Please login again");
          return;
        }
      }
      console.log("🚀 ~ handlePayment ~ error:", error);
      toast.error("Something went wrong in the payment process");
    }
  }, [formData, mutateAsync]);

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-8 mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            currentStep === step.number 
              ? "bg-blue-500 text-white" 
              : currentStep > step.number 
                ? "bg-gray-300 text-gray-600"
                : "bg-gray-200 text-gray-500"
          )}>
            {step.number}
          </div>
          {step.number === currentStep ? (
            <div className="text-blue-500 text-sm font-medium ml-2">
              {step.title}
            </div>
          ) : step.number < currentStep ? (
            <div className="text-gray-500 text-sm ml-2">
              {step.title}
            </div>
          ) : null}
          {/* Add line connector between steps */}
          {index < steps.length - 1 && (
            <div className="w-16 h-0.5 bg-gray-200 mx-4"></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Select 
          value={formData.institutionName}
          onValueChange={(value) => {
            updateFormData('institutionName', value);
            updateFormData('schoolName', value === 'Other' ? formData.manualInstitutionName : value);
          }}
        >
          <SelectTrigger className="w-full h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="Select Institution name *" />
          </SelectTrigger>
          <SelectContent>
            {institutionOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.institutionName === 'Other' && (
        <div>
          <Input
            placeholder="Enter the Institution name *"
            value={formData.manualInstitutionName}
            onChange={(e) => {
              updateFormData('manualInstitutionName', e.target.value);
              updateFormData('schoolName', e.target.value);
            }}
            className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
          />
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <span className="text-yellow-800 text-sm">
          Select your institution from list or enter manually if not listed.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Address line 1 *"
          value={formData.addressLine1}
          onChange={(e) => updateFormData('addressLine1', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
        <Input
          placeholder="Address line 2"
          value={formData.addressLine2}
          onChange={(e) => updateFormData('addressLine2', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="City *"
          value={formData.city}
          onChange={(e) => updateFormData('city', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
        <Input
          placeholder="State *"
          value={formData.state}
          onChange={(e) => updateFormData('state', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
      </div>

      <div>
        <Input
          placeholder="Pincode *"
          value={formData.pincode}
          onChange={(e) => updateFormData('pincode', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Contact Person Name *"
          value={formData.contactName}
          onChange={(e) => updateFormData('contactName', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
        <Input
          placeholder="Contact Email *"
          type="email"
          value={formData.contactEmail}
          onChange={(e) => updateFormData('contactEmail', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select 
          value={formData.country}
          onValueChange={(value) => updateFormData('country', value)}
        >
          <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="in">India</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="md:col-span-2">
          <Input
            placeholder="Mobile Number *"
            value={formData.contactMobile}
            onChange={(e) => updateFormData('contactMobile', e.target.value)}
            className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Button 
          onClick={handleSendOTP}
          disabled={!formData.contactMobile || formData.otpSent}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8"
        >
          <Send className="h-4 w-4 mr-2" />
          {formData.otpSent ? 'OTP Sent' : 'Send OTP'}
        </Button>
      </div>

      {formData.otpSent && (
        <>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-yellow-800 text-sm">
              Enter the OTP sent to your mobile number: {formData.contactMobile}
            </span>
          </div>

          <div className="flex gap-4">
            <Input
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={(e) => updateFormData('otp', e.target.value)}
              className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
              maxLength={6}
            />
            <Button 
              onClick={handleVerifyOTP}
              disabled={formData.otpVerified || !formData.otp}
              className={`px-6 ${formData.otpVerified ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              {formData.otpVerified ? 'Verified ✓' : 'Verify'}
            </Button>
          </div>
        </>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Select 
          value={formData.numberOfStudents}
          onValueChange={(value) => {
            updateFormData('numberOfStudents', value);
            updateFormData('studentsCount', parseInt(value.split('-')[0]) || 0);
          }}
        >
          <SelectTrigger className="w-full h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="Number of Students *" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-50">1-50 Students</SelectItem>
            <SelectItem value="51-100">51-100 Students</SelectItem>
            <SelectItem value="101-200">101-200 Students</SelectItem>
            <SelectItem value="200+">200+ Students</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basics Plan */}
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-all ${
            formData.plan === 'Basics' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
          }`} 
          onClick={() => updateFormData('plan', 'Basics')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              updateFormData('plan', 'Basics');
            }
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Basics</h3>
            <div className={`w-4 h-4 rounded-full border-2 ${
              formData.plan === 'Basics' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            } flex items-center justify-center`}>
              {formData.plan === 'Basics' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Essential Skills to Shape a Promising Future</p>
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center"><span className="text-green-500 mr-2">✔</span>Career Counselling</div>
            <div className="flex items-center"><span className="text-green-500 mr-2">✔</span>Psychology Counselling</div>
            <div className="flex items-center"><span className="text-green-500 mr-2">✔</span>Time Management Training</div>
            <div className="flex items-center"><span className="text-green-500 mr-2">✔</span>Personality Development</div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">₹ 20,000.00</span>
            <span className="text-gray-500 text-sm">/ Per Year</span>
          </div>
        </div>

        {/* Premium Plan */}
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-all ${
            formData.plan === 'Premium' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
          }`} 
          onClick={() => updateFormData('plan', 'Premium')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              updateFormData('plan', 'Premium');
            }
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Premium</h3>
            <div className={`w-4 h-4 rounded-full border-2 ${
              formData.plan === 'Premium' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            } flex items-center justify-center`}>
              {formData.plan === 'Premium' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Comprehensive Training for a Brighter Tomorrow</p>
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center"><span className="text-green-500 mr-2">✔</span>Career Counselling</div>
            <div className="flex items-center"><span className="text-green-500 mr-2">✔</span>Psychology Counselling</div>
            <div className="flex items-center"><span className="text-green-500 mr-2">✔</span>Sex Education</div>
            <div className="flex items-center"><span className="text-green-500 mr-2">✔</span>Entrepreneurship Training</div>
            <div className="flex items-center"><span className="text-green-500 mr-2">✔</span>Personality Development</div>
            <div className="flex items-center"><span className="text-green-500 mr-2">✔</span>Industrial Visit</div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">₹ 40,000.00</span>
            <span className="text-gray-500 text-sm">/ Per Year</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-3xl font-bold text-blue-600 mb-2">₹ {calculatePrice().toLocaleString()}.00</div>
        <div className="text-gray-600">Selected Plan: {formData.plan}</div>
        <div className="text-gray-600">Students: {formData.numberOfStudents}</div>
      </div>
    </div>
  );

  const renderStep4 = () => {
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
              aria-label="Previous month"
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
              aria-label="Next month"
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
                        ? 'bg-blue-500 text-white'
                        : isToday
                          ? 'bg-blue-100 text-blue-600'
                          : 'hover:bg-gray-100'
                  }`}
                  disabled={isDisabled}
                  aria-label={`Select date ${date.getDate()}`}
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
            <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <Select 
              value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} 
              onValueChange={handleDropdownDateSelect}
            >
              <SelectTrigger id="date-select" className="w-full h-12 bg-gray-100 border-0 text-gray-500">
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
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => updateFormData('selectedTime', time)}
                  className={`p-3 text-sm rounded-lg border transition-colors ${
                    formData.selectedTime === time
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                  aria-label={`Select time ${time}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-yellow-800 text-sm">
              After payment, your session will be booked and a Meet link will be shared instantly.
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderStep5 = () => (
    <div className="text-center">
      <div className="bg-green-50 rounded-2xl p-16 mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful</h2>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          Your session has been scheduled at your selected time. A Meet link has been generated and sent to your email.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" className="px-8 py-3">
          Add to Calendar
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
          DOWNLOAD LINK FILE
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
              <Link to="/pricing">
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
            <h1 className="text-2xl font-medium text-gray-900 mb-2">Book your Session</h1>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              <span className="text-yellow-500">Institution Plans & Pricing</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep <= 4 && renderStepIndicator()}

        <Card className="p-8 shadow-sm min-h-96">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </Card>

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

            {/* Continue/Payment Button */}
            <Button 
              onClick={nextStep}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold h-12"
              disabled={isPending}
            >
              {currentStep === 4 ? (isPending ? 'PROCESSING...' : 'PROCEED TO PAYMENT') : 'CONTINUE'}
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InstitutionBookingComplete;