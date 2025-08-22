
import React from 'react';
import Header from '@/components1/Header';
import Footer from '@/components1/Footer';
import GridBackground from '@/components1/GridBackground';
import { Button } from '@/components1/ui/button';
import { ArrowLeft, Share2, Shield, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShare } from '@/hooks/useShare';
import { SharePopup } from '@/components1/ui/SharePopup';

const PsychologyCounselling = () => {
  const { isShowing, handleShare } = useShare();
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
          onClick={handleShare}
          className="flex items-center space-x-2 text-white border-[#00549FB8] rounded-full px-4 hover:bg-[#00549FB8]/90"
          style={{ backgroundColor: '#00549FB8' }}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>
    </div>
      <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Mental Wellbeing</h1>
        </div>
  </div>
</div>



      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        

        {/* Hero Image Section with uploaded image */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <img 
            src="/lovable-uploads/img1.png" 
            alt="Psychology Counselling" 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-8">
              <p className="text-white text-lg leading-relaxed max-w-2xl">
                Stem For Society Initiated to Support students with psychological problems is 
                essential for their well-being and academic success.
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">
            Stem For Society, establishing open communication channels allows students to express their 
            feelings and seek help without stigma. Providing access to counselling services ensures that 
            students receive professional support tailored to their needs
          </p>
        </div>

        {/* Service Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Service Info */}
          <div className='shadow-md rounded-xl  p-6 mb-6'>
            <div className="bg-yellow-50  border-yellow-200 rounded-lg p-4  mb-6 flex items-center space-x-3">
              <Shield className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800 font-medium">Your identity will be 100% confidential</span>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Mental Wellbeing for Students
              </h2>
              <p className="text-gray-600">
                Talk to trained experts about your mental health, 
                academics, or stress - safely and without judgment.
              </p>
            </div>
          </div>

          {/* Right Column - Pricing */}
          <div>
            <div className="bg-white rounded-xl  p-6 mb-6 shadow-md">
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">₹ 2,000.00</span>
                <span className="text-gray-500">/ For 30 mins</span>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start space-x-3">
                <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-green-800 text-sm ">
                  <p className="font-medium ">If you have a Valid student (UG/PG/Ph.D) ID card 75% fee will be waived off by Stem for Society.</p>
                </div>
              </div>
              
              <Link to="/mental-wellbeing-counselling">
                <Button className="w-full bg-[#0389FF] hover:bg-[#0389FF]/90 text-white py-3 text-lg font-semibold">
  BOOK YOUR SESSION
</Button>

              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <SharePopup isVisible={isShowing} />
    </div>
  );
};

export default PsychologyCounselling;
