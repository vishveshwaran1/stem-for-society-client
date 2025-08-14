import React from 'react';
import Header from '@/components1/Header';
import Footer from '@/components1/Footer';
import GridBackground from '@/components1/GridBackground';
import { Button } from '@/components1/ui/button';
import { ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Community = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <GridBackground>
        <Header />
        
        {/* Navigation Bar */}
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-[#0389FF] text-white border-[#0389FF] rounded-full px-4 hover:bg-[#0389FF]/90">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-[#0389FF] text-white border-[#0389FF] rounded-full px-4 hover:bg-[#0389FF]/90">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </GridBackground>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Join our community!</h1>
        </div>

        {/* QR Code Section */}
        <div className="bg-green-100 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* QR Code */}
            
              <div className="w-48 h-64 bg-white rounded-xl p-1 mb-4 shadow-sm overflow-hidden">
  <img 
    src="/lovable-uploads/QR.jpg"
    alt="QR Code" 
    className="w-full h-full object-cover rounded-lg"
  />
</div>

              
          

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Stem for Society<br />
                WhatsApp group
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                to get update related to upcoming<br />
                Events, trainings, workshop
              </p>
              <a 
                href="https://api.whatsapp.com/send/?phone=918296155821&text&type=phone_number&app_absent=0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 font-medium text-lg inline-flex items-center gap-2"
              >
                chat.whatsapp.com <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Community Image Section with uploaded image */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img 
            src="/lovable-uploads/img4.png"
            alt="Community members" 
            className="w-full h-80 object-cover "
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-8">
              <p className="text-white text-xl font-medium leading-relaxed">
                Join our vibrant community and connect with like-minded individuals<br />
                passionate about innovation and collaboration.
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Engage in enriching discussions, share ideas, and access valuable resources that empower 
            personal and professional growth. Together, we can create impactful solutions and inspire change. 
            Become a part of our journey today!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;
