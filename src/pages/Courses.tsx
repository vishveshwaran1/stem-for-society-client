
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components1/ui/button';
import { Card, CardContent } from '@/components1/ui/card';
import { ArrowLeft, Share2, Filter, Search, Calendar, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import FilterDropdown from '@/components1/FilterDropdown';
import GridBackground from '@/components1/GridBackground';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

const Courses = () => {
  const [sectorFilters, setSectorFilters] = useState<FilterOption[]>([
    { id: 'healthcare', label: 'Healthcare', checked: true },
    { id: 'technology', label: 'Technology', checked: true },
    { id: 'biotechnology', label: 'Biotechnology', checked: true },
  ]);

  const [courseTypeFilters, setCourseTypeFilters] = useState<FilterOption[]>([
    { id: 'seminar', label: 'Seminar', checked: true },
    { id: 'webinar', label: 'Webinar', checked: true },
    { id: 'mentorship', label: 'Mentorship', checked: true },
    { id: 'certificate', label: 'Certificate', checked: true },
    { id: 'handson', label: 'Hands-on', checked: true },
  ]);

  const [startDateFilters, setStartDateFilters] = useState<FilterOption[]>([
    { id: 'thisweek', label: 'This Week', checked: true },
    { id: 'thismonth', label: 'This month', checked: true },
    { id: 'customrange', label: 'Custom range', checked: true },
  ]);

  const [modeFilters, setModeFilters] = useState<FilterOption[]>([
    { id: 'online', label: 'Online', checked: true },
    { id: 'offline', label: 'Offline', checked: true },
    { id: 'hybrid', label: 'Hybrid', checked: true },
  ]);

  const handleFilterChange = (filterType: string, optionId: string, checked: boolean) => {
    switch (filterType) {
      case 'sector':
        setSectorFilters(prev => prev.map(item => 
          item.id === optionId ? { ...item, checked } : item
        ));
        break;
      case 'courseType':
        setCourseTypeFilters(prev => prev.map(item => 
          item.id === optionId ? { ...item, checked } : item
        ));
        break;
      case 'startDate':
        setStartDateFilters(prev => prev.map(item => 
          item.id === optionId ? { ...item, checked } : item
        ));
        break;
      case 'mode':
        setModeFilters(prev => prev.map(item => 
          item.id === optionId ? { ...item, checked } : item
        ));
        break;
    }
  };

  const resetFilters = () => {
    setSectorFilters(prev => prev.map(item => ({ ...item, checked: false })));
    setCourseTypeFilters(prev => prev.map(item => ({ ...item, checked: false })));
    setStartDateFilters(prev => prev.map(item => ({ ...item, checked: false })));
    setModeFilters(prev => prev.map(item => ({ ...item, checked: false })));
  };

  const courses = [
    {
      id: 1,
      title: 'AI for Medical Diagnosis',
      sector: 'Healthcare',
      date: '15 May 2025',
      day: 'Thursday',
      mode: 'Online',
      location: 'Virtual Classroom',
      price: '₹2,500',
      month: 'May 2025',
      type: 'Certificate Program',
      duration: '6 weeks',
      level: 'Intermediate'
    },
    {
      id: 2,
      title: 'Machine Learning in Drug Discovery',
      sector: 'Biotechnology',
      date: '22 May 2025',
      day: 'Thursday',
      mode: 'Hybrid',
      location: 'IIT Mumbai',
      price: '₹3,200',
      month: 'May 2025',
      type: 'Certificate Program',
      duration: '8 weeks',
      level: 'Advanced'
    },
    {
      id: 3,
      title: 'Quantum Computing Fundamentals',
      sector: 'Technology',
      date: '5 June 2025',
      day: 'Thursday',
      mode: 'Online',
      location: 'Virtual Classroom',
      price: '₹2,800',
      month: 'June 2025',
      type: 'Certificate Program',
      duration: '4 weeks',
      level: 'Beginner'
    },
    {
      id: 4,
      title: 'Blockchain in Healthcare',
      sector: 'Healthcare',
      date: '12 June 2025',
      day: 'Thursday',
      mode: 'Offline',
      location: 'AIIMS Delhi',
      price: '₹4,000',
      month: 'June 2025',
      type: 'Certificate Program',
      duration: '6 weeks',
      level: 'Intermediate'
    }
  ];

  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.month]) {
      acc[course.month] = [];
    }
    acc[course.month].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);

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
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Explore Courses</h1>
          <h2 className="text-3xl font-bold text-gray-900">Get trained and become Certified Professional</h2>
        </div>
  </div>
</div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
       

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm  p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter By</span>
            </div>
            
            <FilterDropdown
              title="Sector"
              options={sectorFilters}
              onOptionChange={(optionId, checked) => handleFilterChange('sector', optionId, checked)}
            />
            
            <FilterDropdown
              title="Course type"
              options={courseTypeFilters}
              onOptionChange={(optionId, checked) => handleFilterChange('courseType', optionId, checked)}
              
            />
            
            <FilterDropdown
              title="Start date"
              options={startDateFilters}
              onOptionChange={(optionId, checked) => handleFilterChange('startDate', optionId, checked)}
            />
            
            <FilterDropdown
              title="Mode"
              options={modeFilters}
              onOptionChange={(optionId, checked) => handleFilterChange('mode', optionId, checked)}
            />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-600 flex items-center space-x-1"
              onClick={resetFilters}
            >
              <span className="text-red-500">↻</span>
              <span>Reset Filter</span>
            </Button>
            
            <div className="ml-auto flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for Courses"
                className="border border-gray-300 rounded px-3 py-1 text-sm w-64"
              />
            </div>
          </div>
        </div>

        {/* Courses List */}
        {Object.entries(groupedCourses).map(([month, monthCourses]) => (
          <div key={month} className="mb-8">
            <h3 className="text-xl font-medium text-gray-400 mb-6">{month}</h3>
            
            <div className="space-y-4">
              {monthCourses.map((course) => (
                <Link key={course.id} to={`/course-detail/${course.id}`}>
                  <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          {/* Course Image Placeholder */}
                          <div className="w-24 h-20 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500 text-center">{course.type}</span>
                          </div>
                          
                          {/* Course Details */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-medium text-gray-900">{course.title}</h4>
                              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-medium">
                                {course.sector}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{course.date}</span>
                                <span>{course.day}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span>Mode:</span>
                                <span>{course.mode}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{course.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-1 text-lg font-semibold text-gray-900">
                              <span>{course.price}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                          <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>More Info</Button>
                          <Button className="bg-[#0389FF] hover:bg-[#0389FF]/90 text-white" onClick={(e) => e.preventDefault()}>REGISTER NOW</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-gray-600">Showing 1-12 of 1234</p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>‹</Button>
            <Button variant="outline" size="sm">›</Button>
          </div>
        </div>
      </div>

      {/* Counseling Section */}
      <div className="bg-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="w-32 h-32 bg-blue-300 rounded-full overflow-hidden">
                <img 
                  src="/lovable-uploads/b0da6a24-f85c-48ba-8f2f-2fce65f2f2d1.png" 
                  alt="Counselor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Not sure where to start?</h3>
                <p className="text-xl text-gray-700">Book a free counselling session and we'll guide you.</p>
              </div>
            </div>
            <Button className="bg-[#0389FF] hover:bg-[#0389FF]/90 text-white px-8 py-3">
              BOOK COUNSELLING
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
