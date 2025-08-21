import React, { useState } from 'react';
import Header from '@/components1/Header';
import GridBackground from '@/components1/GridBackground';
import { Button } from '@/components1/ui/button';
import { Input } from '@/components1/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components1/ui/select';
import { Calendar } from '@/components1/ui/calendar';
import { ArrowLeft,Share2, ChevronLeft, ChevronRight, Check, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstitutionBookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [formData, setFormData] = useState({
    institutionName: '',
    manualInstitutionName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    firstName: '',
    lastName: '',
    country: '',
    mobileNumber: '',
    otp: '',
    numberOfStudents: ''
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const timeSlots = [
    '10:30 AM', '11:30 AM', '12:30 PM', '3:30 AM', '4:30 PM', '5:30 PM'
  ];

  const stepTitles = [
    'Institution Information',
    'Point of Contact', 
    'Student Information',
    'Schedule meet'
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-8 mb-12">
      {[1, 2, 3, 4].map((step) => (
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
          {step < 4 && step !== currentStep && (
            <div className="text-gray-500 text-sm ml-2">
              {stepTitles[step - 1]}
            </div>
          )}
          {step === currentStep && (
            <div className="text-blue-500 text-sm font-medium ml-2">
              {stepTitles[step - 1]}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
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

      <div>
        <Input
          placeholder="Enter the Institution name"
          value={formData.manualInstitutionName}
          onChange={(e) => handleInputChange('manualInstitutionName', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <span className="text-yellow-800 text-sm">
          Select your institution from list or enter manually if not listed.
        </span>
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
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          placeholder="Pincode"
          value={formData.pincode}
          onChange={(e) => handleInputChange('pincode', e.target.value)}
          className="h-12 bg-gray-100 border-0 placeholder:text-gray-500"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select onValueChange={(value) => handleInputChange('country', value)}>
          <SelectTrigger className="h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="in">India</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
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

      <div className="flex items-center justify-end">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8">
          Send OTP
        </Button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <span className="text-yellow-800 text-sm">
          Enter the OTP sent to your mobile number.
        </span>
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
        <Select onValueChange={(value) => handleInputChange('numberOfStudents', value)}>
          <SelectTrigger className="w-full h-12 bg-gray-100 border-0 text-gray-500">
            <SelectValue placeholder="Number of Students" />
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
        <div className={`border rounded-lg p-6 cursor-pointer transition-all ${
          selectedPlan === 'basics' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
        }`} onClick={() => setSelectedPlan('basics')}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Basics</h3>
            <div className={`w-4 h-4 rounded-full border-2 ${
              selectedPlan === 'basics' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            } flex items-center justify-center`}>
              {selectedPlan === 'basics' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Essential Skills to Shape a Promising Future</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">₹ 20,000.00</span>
            <span className="text-gray-500 text-sm">/ Per Year</span>
          </div>
        </div>

        {/* Premium Plan */}
        <div className={`border rounded-lg p-6 cursor-pointer transition-all ${
          selectedPlan === 'premium' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
        }`} onClick={() => setSelectedPlan('premium')}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Premium</h3>
            <div className={`w-4 h-4 rounded-full border-2 ${
              selectedPlan === 'premium' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            } flex items-center justify-center`}>
              {selectedPlan === 'premium' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Comprehensive Training for a Brighter Tomorrow</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">₹ 40,000.00</span>
            <span className="text-gray-500 text-sm">/ Per Year</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
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
            
            return (
              <button
                key={i}
                onClick={() => isCurrentMonth && setSelectedDate(date)}
                className={`p-2 text-sm rounded-lg transition-colors ${
                  !isCurrentMonth 
                    ? 'text-gray-300 cursor-not-allowed'
                    : isSelected
                      ? 'bg-blue-500 text-white'
                      : isToday
                        ? 'bg-blue-100 text-blue-600'
                        : 'hover:bg-gray-100'
                }`}
                disabled={!isCurrentMonth}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side */}
      <div className="space-y-6">
        <div>
          <Select onValueChange={(value) => setSelectedDate(new Date(value))}>
            <SelectTrigger className="w-full h-12 bg-gray-100 border-0 text-gray-500">
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-09-15">September 15, 2023</SelectItem>
              <SelectItem value="2023-09-16">September 16, 2023</SelectItem>
              <SelectItem value="2023-09-17">September 17, 2023</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-4">Available Time</h4>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 text-sm rounded-lg border transition-colors ${
                  selectedTime === time
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
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
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Book your Session</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            <span className="text-yellow-500">Institution Plans & Pricing</span>
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
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>

        {currentStep < 5 && (
          <div className="flex justify-end mt-8">
            <Button 
              onClick={nextStep}
              className={`px-8 py-3 text-white font-medium ${
                currentStep === 4 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {currentStep === 4 ? 'PROCEED TO PAYMENT' : 'CONTINUE'}
            </Button>
          </div>
        )}
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

export default InstitutionBookingFlow;
