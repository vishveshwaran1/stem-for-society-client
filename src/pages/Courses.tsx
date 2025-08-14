import React, { useState, useEffect } from 'react';
import Header from '@/components1/Header';
import Footer from '@/components1/Footer';
import { Button } from '@/components1/ui/button';
import { Card, CardContent } from '@/components1/ui/card';
import { ArrowLeft, Share2, Filter, Search, Calendar, MapPin, DollarSign, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import FilterDropdown from '@/components1/FilterDropdown';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}



const Courses = () => {
  const [sectorFilters, setSectorFilters] = useState<FilterOption[]>([
    { id: 'healthcare', label: 'Healthcare', checked: false },
    { id: 'technology', label: 'Technology', checked: false },
    { id: 'biotechnology', label: 'Biotechnology', checked: false },
  ]);

  const [courseTypeFilters, setCourseTypeFilters] = useState<FilterOption[]>([
    { id: 'seminar', label: 'Seminar', checked: false },
    { id: 'webinar', label: 'Webinar', checked: false },
    { id: 'mentorship', label: 'Mentorship', checked: false },
    { id: 'certificate', label: 'Certificate', checked: false },
    { id: 'handson', label: 'Hands-on', checked: false },
  ]);

  const [startDateFilters, setStartDateFilters] = useState<FilterOption[]>([
    { id: 'thisweek', label: 'This Week', checked: false },
    { id: 'thismonth', label: 'This month', checked: false },
    { id: 'customrange', label: 'Custom range', checked: false },
  ]);

  const [modeFilters, setModeFilters] = useState<FilterOption[]>([
    { id: 'online', label: 'Online', checked: false },
    { id: 'offline', label: 'Offline', checked: false },
    { id: 'hybrid', label: 'Hybrid', checked: false },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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
  setSectorFilters(prev => prev.map(item => ({ ...item, checked: true })));
  setCourseTypeFilters(prev => prev.map(item => ({ ...item, checked: true })));
  setStartDateFilters(prev => prev.map(item => ({ ...item, checked: true })));
  setModeFilters(prev => prev.map(item => ({ ...item, checked: true })));
  setSearchQuery('');
};


  const toggleMonthExpand = (month: string) => {
    setExpandedMonth(expandedMonth === month ? null : month);
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
      level: 'Intermediate',
      image: '/course-images/medical-ai.jpg'
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
      level: 'Advanced',
      image: '/course-images/drug-discovery.jpg'
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
      level: 'Beginner',
      image: '/course-images/quantum-computing.jpg'
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
      level: 'Intermediate',
      image: '/course-images/blockchain-health.jpg'
    }
  ];

 // Replace the current filteredCourses logic with this:
const filteredCourses = courses.filter(course => {
  // Sector filter - show all if none selected
  const sectorFilterActive = sectorFilters.some(f => f.checked);
  const matchesSector = !sectorFilterActive || 
                       sectorFilters.some(f => f.checked && f.label.toLowerCase() === course.sector.toLowerCase());
  
  // Mode filter - show all if none selected
  const modeFilterActive = modeFilters.some(f => f.checked);
  const matchesMode = !modeFilterActive || 
                     modeFilters.some(f => f.checked && f.label.toLowerCase() === course.mode.toLowerCase());
  
  // Course type filter - show all if none selected
  const courseTypeFilterActive = courseTypeFilters.some(f => f.checked);
  const matchesCourseType = !courseTypeFilterActive || 
                           courseTypeFilters.some(f => f.checked && f.label.toLowerCase() === course.type.toLowerCase());
  
  // Search matches either title or sector
  const matchesSearch = searchQuery === '' || 
                       course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       course.sector.toLowerCase().includes(searchQuery.toLowerCase());
  
  return matchesSector && matchesMode && matchesCourseType && matchesSearch;
});
const groupedCourses = filteredCourses.reduce((acc, course) => {
  if (!acc[course.month]) {
    acc[course.month] = [];
  }
  acc[course.month].push(course);
  return acc;
}, {} as Record<string, typeof courses>);
 const navigate = useNavigate();

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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 bg-[#0389FF] text-white border-[#0389FF] rounded-full px-4 hover:bg-[#0389FF]/90"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
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
                  <span>Share</span>
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-gray-900 mb-2"
            >
              Explore Courses
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-gray-900"
            >
              Get trained and become Certified Professional
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8 sticky top-4 z-20"
        >
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
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-600 flex items-center space-x-1"
                onClick={resetFilters}
              >
                <span className="text-red-500">↻</span>
                <span>Reset Filter</span>
              </Button>
            </motion.div>
            
            <div className="ml-auto flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <Search className="h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for Courses"
                className="bg-transparent border-none focus:ring-0 text-sm w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Courses List */}
        {Object.entries(groupedCourses).length > 0 ? (
          Object.entries(groupedCourses).map(([month, monthCourses]) => (
            <div key={month} className="mb-8">
              <motion.div 
                className="flex items-center justify-between cursor-pointer mb-4"
                onClick={() => toggleMonthExpand(month)}
                whileHover={{ x: 5 }}
              >
                <h3 className="text-xl font-medium text-gray-400">{month}</h3>
                {expandedMonth === month ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </motion.div>
              
              <AnimatePresence>
                {(expandedMonth === month || expandedMonth === null) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {monthCourses.map((course) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <Link to={`/course-detail/${course.id}`}>
                          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row">
                                {/* Course Image */}
                                <div className="w-full md:w-48 h-48 bg-gray-200 relative overflow-hidden">
                                  <img 
                                    src={course.image} 
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                  />
                                  <div className="absolute top-2 left-2 bg-[#0389FF] text-white text-xs px-2 py-1 rounded">
                                    {course.type}
                                  </div>
                                </div>
                                
                                {/* Course Details */}
                                <div className="flex-1 p-6">
                                  <div className="flex flex-col h-full justify-between">
                                    <div>
                                      <div className="flex items-start justify-between">
                                        <h4 className="text-lg font-medium text-gray-900 mb-2">{course.title}</h4>
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-medium">
                                          {course.sector}
                                        </span>
                                      </div>
                                      
                                      <div className="mt-3 space-y-2">
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                          <div className="flex items-center space-x-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{course.date}</span>
                                            <span>•</span>
                                            <span>{course.day}</span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <span className="font-medium">Mode:</span>
                                            <span>{course.mode}</span>
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                          <div className="flex items-center space-x-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{course.location}</span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <span className="font-medium">Duration:</span>
                                            <span>{course.duration}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-4">
                                      <div className="flex items-center space-x-1 text-lg font-semibold text-gray-900">
                                       
                                        <span>{course.price}</span>
                                      </div>
                                      
                                      {/* Action Buttons */}
                                      <div className="flex items-center space-x-3">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>
                                            More Info
                                          </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button 
                                            className="bg-[#0389FF] hover:bg-[#0389FF]/90 text-white"
                                            onClick={() => navigate(`/course-detail/${course.id}`)}
                                          >
                                            REGISTER NOW
                                          </Button>
                                        </motion.div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
            <Button 
              variant="ghost" 
              className="mt-4 text-[#0389FF] hover:text-[#0389FF]/90"
              onClick={resetFilters}
            >
              Reset all filters
            </Button>
          </motion.div>
        )}

        {/* Pagination */}
        {Object.entries(groupedCourses).length > 0 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-600">Showing 1-{filteredCourses.length} of {filteredCourses.length}</p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>‹</Button>
              <Button variant="outline" size="sm">›</Button>
            </div>
          </div>
        )}
      </div>

      {/* Counseling Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-blue-100 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-blue-300 rounded-full overflow-hidden shadow-md">
                <img 
                  src="/lovable-uploads/b0da6a24-f85c-48ba-8f2f-2fce65f2f2d1.png" 
                  alt="Counselor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Not sure where to start?</h3>
                <p className="text-lg text-gray-700">Book a free counselling session and we'll guide you.</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#0389FF] hover:bg-[#0389FF]/90 text-white px-8 py-3 text-lg">
                BOOK COUNSELLING
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Courses;