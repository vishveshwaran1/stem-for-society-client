import React from 'react';
import Header from '@/components1/Header';
import Footer from '@/components1/Footer';
import { Button } from '@/components1/ui/button';
import { ArrowLeft, Share2, Calendar, MapPin, Clock, Award, User, Building2, BookOpen, CheckCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const CourseDetail = () => {
  const { id } = useParams();
  
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
    topics: [
      'Patient history & symptom clustering',
      'Common diagnostic tests & imaging',
      'Differential diagnosis frameworks',
      'Red flags in common presentations',
      'Communicating diagnoses to patients'
    ],
    image: '/course-images/medical-ai.jpg',
    syllabus: [
      'Week 1: Introduction to Medical AI',
      'Week 2: Diagnostic Fundamentals',
      'Week 3: Clinical Case Studies',
      'Week 4: Imaging Interpretation',
      'Week 5: Treatment Planning',
      'Week 6: Capstone Project'
    ],
    requirements: [
      'Basic medical knowledge',
      'Computer with internet access',
      '5-7 hours/week commitment'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Area */}
      <div className="relative bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
          
          <div className="flex items-center justify-between py-6">
            <Link to="/courses">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 bg-[#0389FF] text-white border-[#0389FF] rounded-full px-4 hover:bg-[#0389FF]/90"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Courses</span>
                </Button>
              </motion.div>
            </Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 bg-[#0389FF] text-white border-[#0389FF] rounded-full px-4 hover:bg-[#0389FF]/90"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Course</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Course Meta */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{course.description.split('.')[0]}.</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                  <User className="h-5 w-5 mr-2" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                  <Award className="h-5 w-5 mr-2" />
                  <span>Certificate</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Enrollment Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 h-fit sticky top-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{course.price}</h3>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
                {course.sector}
              </span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>Starts {course.date}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <span className="w-5 h-5 flex items-center justify-center text-blue-500">💻</span>
                <span>{course.mode} • {course.location}</span>
              </div>
            </div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full bg-[#0389FF] hover:bg-[#0389FF]/90 text-white py-4 text-lg">
                Enroll Now
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Course Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">About This Course</h2>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 mb-4">{course.description}</p>
                <p className="text-gray-700">Through this comprehensive program, you'll gain practical skills that can be immediately applied in clinical settings, enhancing both your diagnostic accuracy and patient communication abilities.</p>
              </div>
            </motion.div>

            {/* Syllabus */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <BookOpen className="h-6 w-6 mr-3 text-blue-500" />
                Course Syllabus
              </h2>
              <div className="space-y-4">
                {course.syllabus.map((item, index) => (
                  <div key={index} className="flex items-start border-b border-gray-100 pb-4">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item}</h3>
                      <p className="text-gray-600 text-sm mt-1">3-5 hours of content • Practical exercises</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Instructor Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                Instructor
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                  <img src="/instructor.jpg" alt={course.instructor} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{course.instructor}</h3>
                  <p className="text-gray-600">Medical AI Specialist</p>
                </div>
              </div>
              <p className="text-gray-700">With over 15 years of experience in both clinical practice and AI research, Dr. Sachin brings a unique perspective to medical education.</p>
            </motion.div>

            {/* Requirements */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />
                Requirements
              </h2>
              <ul className="space-y-3">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Institution */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-blue-500" />
                Institution
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <img src="/institution-logo.jpg" alt={course.institution} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{course.institution}</h3>
                  <p className="text-gray-600">Established 1985</p>
                </div>
              </div>
              <p className="text-gray-700">A premier institution known for innovation in healthcare education and research.</p>
            </motion.div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.topics.map((topic, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <p className="text-gray-700">{topic}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center bg-gradient-to-r from-blue-50 to-white rounded-xl p-12 mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Career?</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Join {course.instructor} and {course.institution} in this comprehensive {course.duration} program</p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button className="bg-[#0389FF] hover:bg-[#0389FF]/90 text-white px-16 py-6 text-xl">
              Enroll Now for {course.price}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;