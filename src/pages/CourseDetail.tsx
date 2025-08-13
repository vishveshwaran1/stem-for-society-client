
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components1/ui/button';
import { ArrowLeft, Share2, Calendar, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import GridBackground from '@/components1/GridBackground';

const CourseDetail = () => {
  const { id } = useParams();
  
  // Mock course data - in real app this would come from API or database
  const course = {
    id: id || '1',
    title: 'AI for Medical Diagnosis',
    sector: 'Healthcare',
    date: '15 May 2025',
    day: 'Thursday',
    mode: 'Online',
    location: 'Virtual Classroom',
    price: '₹2,500',
    duration: '6 weeks',
    level: 'Intermediate',
    certificate: 'Yes, Upon Completion',
    instructor: 'Dr. Sree Sachin',
    institution: 'Sri Sairam Institute of Technology',
    description: 'This 6-week online course is designed for medical students and healthcare professionals who want to strengthen their diagnostic skills. You\'ll explore real-world clinical scenarios, learn to analyze patient symptoms, interpret test results, and confidently arrive at differential diagnoses. The course includes case-based discussions, expert-led video lectures, interactive simulations, and end-of-module quizzes.',
    topics: 'Patient history & symptom clustering, Common diagnostic tests & imaging, Differential diagnosis frameworks, Red flags in common presentations, Communicating diagnoses to patients'
  };

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
      <p className="text-lg text-center text-gray-600 mb-4">Detailed view</p>
      <h1 className="text-4xl text-center font-bold text-gray-900 mb-6">{course.title}</h1>
  </div>
</div>


      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          
          
          
          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">Duration: {course.duration}</span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">Level: {course.level}</span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">Mode: {course.mode}</span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">Certificate: {course.certificate}</span>
          </div>
        </div>

        {/* Course Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              {/* Course Image Placeholder */}
              <div className="w-32 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-gray-500 text-center">Certificate Program</span>
              </div>
              
              {/* Course Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-medium text-gray-900">{course.title}</h3>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-medium">
                    {course.sector}
                  </span>
                </div>
                
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{course.date} {course.day}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 flex items-center justify-center">💻</span>
                    <span>{course.mode}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{course.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-xl font-semibold text-gray-900 mt-4">
                  <span>{course.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Description */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Topics Covered */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="bg-blue-100 px-6 py-4 rounded-t-lg">
            <h3 className="text-lg font-medium text-gray-900">Topics Covered</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-700">
              {course.topics}
            </p>
          </div>
        </div>

        {/* Instructor and Institution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-blue-100 px-6 py-4 rounded-t-lg">
              <h3 className="text-lg font-medium text-gray-900">Instructor</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700">{course.instructor}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-blue-100 px-6 py-4 rounded-t-lg">
              <h3 className="text-lg font-medium text-gray-900">Institution/Industry</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700">{course.institution}</p>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="text-right">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Register Now
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
