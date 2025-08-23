import React, { useMemo, useState, useEffect } from 'react';
import Header from '@/components1/Header';
import Footer from '@/components1/Footer';
import { Button } from '@/components1/ui/button';
import { Card, CardContent } from '@/components1/ui/card';
import { 
  ArrowLeft, 
  Share2, 
  Filter, 
  Search, 
  Calendar, 
  MapPin, 
  DollarSign, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FilterDropdown from '@/components1/FilterDropdown';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { parseAsBoolean, useQueryState } from "nuqs";
import Errorbox from "../components/Errorbox";
import Loading from "../components/Loading";
import { api } from "../lib/api";
import { GenericError, GenericResponse } from "../lib/types";
import { formatDate } from "../lib/utils";

dayjs.extend(isBetween);

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

export type StudentTraining = {
  id: string;
  title: string;
  coverImg: string;
  startDate: string;
  endDate: string;
  description: string;
  createdAt: string;
  category?: string;
  instructor: {
    firstName: string;
    lastName?: string;
    institutionName?: string;
  };
  link?: string;
  cost: string;
  location?: string; // Used for mode detection: null = Online, value = Offline
  isEnrolled: boolean;
  displayFeedback: boolean;
  ratings: {
    feedback: string;
    rating: number;
    completedOn: string;
  }[];
  enrolments: {
    id: string;
    userId: string;
    trainingId: string;
    completedOn: string | null;
    createdAt: string;
    updatedAt?: string;
    certificateNo?: string;
    certificate?: string;
    transactions?: {
      amount: string;
      status: string;
    }[];
  }[];
  type: "ONLINE" | "OFFLINE" | "HYBRID";
  lessons: {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    title: string;
    location: string | null;
    type: "ONLINE" | "OFFLINE";
    trainingId: string | null;
    content: string | null;
    video: string | null;
    lastDate: Date | null;
  }[];
};

// Custom hook to fetch trainings data
function useTrainings() {
  return useQuery<
    { [key: string]: StudentTraining[] } | object,
    AxiosError<GenericError>
  >({
    queryKey: ["trainings"],
    queryFn: async () => {
      const response = await api().get<GenericResponse<StudentTraining[]>>("/trainings");
      
      if (!response.data?.data?.length) return {};
      
      // Group trainings by month
      const groupedByMonth = response.data.data.reduce((acc, training) => {
        const monthYear = dayjs(training.startDate).format("MMM, YYYY");
        if (!acc[monthYear]) acc[monthYear] = [];
        acc[monthYear].push(training);
        return acc;
      }, {} as { [key: string]: StudentTraining[] });
      
      return groupedByMonth;
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
}

const Courses = () => {
  const navigate = useNavigate();
  
  // Data fetching
  const { data: trainings, isLoading, error } = useTrainings();
  
  // URL state for filters (maintaining backward compatibility)
  const [trainingFilter, setTrainingFilter] = useQueryState<string[] | null>(
    "filter",
    {
      defaultValue: null,
      parse(value) {
        return Array.isArray(value) ? value : value ? [value] : null;
      },
      clearOnDefault: true,
    }
  );

  const [filterByMe, setFilterByMe] = useQueryState<boolean>(
    "me",
    parseAsBoolean
  );

  // Local state for search and filters
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  // Filter options
  const [sectorFilters, setSectorFilters] = useState<FilterOption[]>([
    { id: 'healthcare', label: 'Healthcare', checked: false },
    { id: 'technology', label: 'Technology', checked: false },
    { id: 'biotechnology', label: 'Biotechnology', checked: false },
    { id: 'ai', label: 'AI/ML', checked: false },
    { id: 'data', label: 'Data Science', checked: false },
  ]);

  const [courseTypeFilters, setCourseTypeFilters] = useState<FilterOption[]>([
    { id: 'seminar', label: 'Seminar', checked: false },
    { id: 'webinar', label: 'Webinar', checked: false },
    { id: 'mentorship', label: 'Mentorship', checked: false },
    { id: 'certificate', label: 'Certificate', checked: false },
    { id: 'handson', label: 'Hands On', checked: false },
    { id: 'training', label: 'Training Program', checked: false },
  ]);

  const [startDateFilters, setStartDateFilters] = useState<FilterOption[]>([
    { id: 'thisweek', label: 'This Week', checked: false },
    { id: 'thismonth', label: 'This month', checked: false },
  ]);

  const [modeFilters, setModeFilters] = useState<FilterOption[]>([
    { id: 'online', label: 'Online', checked: false },
    { id: 'offline', label: 'Offline', checked: false },
  ]);

  // Course type mapping to filter values
  const courseTypeMapping = {
    'Seminar': 'Seminars/Webinar/Mentorship',
    'Webinar': 'Seminars/Webinar/Mentorship', 
    'Mentorship': 'Seminars/Webinar/Mentorship',
    'Certificate': 'Certificate Program',
    'Hands On': 'Instrumentation Hands-on',
    'Training Program': 'Corporate Training'
  };

  // FIX: Add dependency on trainingFilter and ensure proper re-sync
  useEffect(() => {
    // Reset all course type filters first
    setCourseTypeFilters(prev => prev.map(item => ({ ...item, checked: false })));
    
    // Then set the correct ones based on URL parameters
    if (trainingFilter && trainingFilter.length > 0) {
      setCourseTypeFilters(prev => prev.map(item => {
        const mappedValue = courseTypeMapping[item.label as keyof typeof courseTypeMapping];
        return {
          ...item,
          checked: trainingFilter.includes(mappedValue)
        };
      }));
    }
  }, [trainingFilter]); // This will trigger when URL changes

  // FIX: Add effect to force re-render when navigating
  useEffect(() => {
    // Force component to update when URL filter changes
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    
    if (urlFilter && urlFilter !== trainingFilter?.[0]) {
      // URL changed but state hasn't updated yet, force update
      setTrainingFilter([urlFilter]);
    }
  }, [window.location.search]); // Listen to URL changes

  // FIX: Reset other filters when trainingFilter changes from URL navigation
  useEffect(() => {
    if (trainingFilter) {
      // Reset other filters when navigating from header dropdown
      setSectorFilters(prev => prev.map(item => ({ ...item, checked: false })));
      setStartDateFilters(prev => prev.map(item => ({ ...item, checked: false })));
      setModeFilters(prev => prev.map(item => ({ ...item, checked: false })));
      setSearch('');
      setSearchQuery('');
    }
  }, [trainingFilter]);

  // Helper functions
  const getDisplayMode = (location?: string) => {
    return location ? "Offline" : "Online";
  };

  const getCourseImage = (training: StudentTraining) => {
    return training.coverImg || '/course-images/default.jpg';
  };

  const formatPrice = (cost: string) => {
    if (cost === '0' || cost.toLowerCase() === 'free') return 'Free';
    return  `₹${cost}`;
  };

  const checkDateFilter = (startDate: string, filterType: string) => {
    const today = dayjs();
    const courseDate = dayjs(startDate);
    
    switch (filterType) {
      case 'thisweek':
        const weekStart = today.startOf('week').add(1, 'day'); // Monday
        const weekEnd = today.endOf('week').add(1, 'day'); // Sunday
        return courseDate.isBetween(weekStart, weekEnd, null, '[]');
        
      case 'thismonth':
        const monthStart = today.startOf('month');
        const monthEnd = today.endOf('month');
        return courseDate.isBetween(monthStart, monthEnd, null, '[]');
        
      default:
        return true;
    }
  };

  // Add this helper function after the other helper functions (around line 200)
  const isUserEnrolled = (training: StudentTraining) => {
    // Check the isEnrolled flag first
    if (training.isEnrolled) return true;
    
    // Check if user has successful transactions (same logic as filter)
    return training.enrolments.some(enrollment =>
      enrollment.transactions?.some(transaction => 
        transaction.status === "success"
      )
    );
  };

  // Main filtering logic
  const filteredTrainings = useMemo(() => {
    if (!trainings) return {};
    
    return Object.keys(trainings).reduce((result, monthKey) => {
      const monthTrainings = trainings[monthKey as keyof typeof trainings] as StudentTraining[];
      
      const filtered = monthTrainings.filter((training) => {
        // Search filter
        const searchTerm = search.toLowerCase();
        const queryTerm = searchQuery.toLowerCase();
        const matchesSearch = training.title.toLowerCase().includes(searchTerm) ||
                             training.title.toLowerCase().includes(queryTerm);
        
        // Category filter (from URL)
        const hasCategories = trainingFilter?.length > 0;
        const matchesCategory = !hasCategories || 
                             trainingFilter.includes(training.category ?? "");
        
        // FIX: Update enrollment filter to use the helper function
        const matchesEnrollment = !filterByMe || isUserEnrolled(training);

        // Sector filter
        const hasSectorFilter = sectorFilters.some(f => f.checked);
        const matchesSector = !hasSectorFilter || 
                           sectorFilters.some(filter => 
                             filter.checked && 
                             training.category?.toLowerCase().includes(filter.label.toLowerCase())
                           );
      
        // Mode filter
        const hasModeFilter = modeFilters.some(f => f.checked);
        const matchesMode = !hasModeFilter || 
                         modeFilters.some(filter => {
                           if (!filter.checked) return false;
                           const trainingMode = getDisplayMode(training.location);
                           return filter.label.toLowerCase() === trainingMode.toLowerCase();
                         });

        // Date filter
        const hasDateFilter = startDateFilters.some(f => f.checked);
        const matchesDate = !hasDateFilter ||
                           startDateFilters.some(filter => {
                             if (!filter.checked) return false;
                             return checkDateFilter(training.startDate, filter.id);
                           });

        return matchesSearch && matchesCategory && matchesEnrollment && 
               matchesSector && matchesMode && matchesDate;
      });

      if (filtered.length > 0) {
        result[monthKey] = filtered;
      }
      return result;
    }, {} as { [key: string]: StudentTraining[] });
  }, [search, searchQuery, trainings, trainingFilter, filterByMe, 
      sectorFilters, modeFilters, startDateFilters]);

  // Filter change handlers
  const handleCourseTypeFilter = (optionId: string, checked: boolean) => {
    const selectedFilter = courseTypeFilters.find(item => item.id === optionId);
    if (!selectedFilter) return;
    
    const mappedValue = courseTypeMapping[selectedFilter.label as keyof typeof courseTypeMapping];
    
    setTrainingFilter(prev => {
      if (!prev) {
        return checked ? [mappedValue] : null;
      }
      
      if (checked) {
        return prev.includes(mappedValue) ? prev : [...prev, mappedValue];
      } else {
        const filtered = prev.filter(x => x !== mappedValue);
        return filtered.length > 0 ? filtered : null;
      }
    });
  };

  const handleFilterChange = (filterType: string, optionId: string, checked: boolean) => {
    const updateFilter = (setter: React.Dispatch<React.SetStateAction<FilterOption[]>>) => {
      setter(prev => prev.map(item => 
        item.id === optionId ? { ...item, checked } : item
      ));
    };

    switch (filterType) {
      case 'sector':
        updateFilter(setSectorFilters);
        break;
      case 'courseType':
        handleCourseTypeFilter(optionId, checked);
        break;
      case 'startDate':
        updateFilter(setStartDateFilters);
        break;
      case 'mode':
        updateFilter(setModeFilters);
        break;
    }
  };

  const resetAllFilters = () => {
    setSectorFilters(prev => prev.map(item => ({ ...item, checked: false })));
    setCourseTypeFilters(prev => prev.map(item => ({ ...item, checked: false })));
    setStartDateFilters(prev => prev.map(item => ({ ...item, checked: false })));
    setModeFilters(prev => prev.map(item => ({ ...item, checked: false })));
    setSearchQuery('');
    setSearch('');
    setTrainingFilter(null);
    setFilterByMe(null);
  };

  const toggleMonthExpansion = (month: string) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  // Loading and error states
  if (isLoading) return <Loading />;
  if (error) return <Errorbox message={error.message} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Grid Background - REDUCED HEIGHT */}
      <div className="relative"> {/* Removed min-h-screen */}
        {/* Decorative grid background */}
        <div 
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(107,114,128,0.5) 2px, transparent 2px),
              linear-gradient(90deg, rgba(107,114,128,0.5) 2px, transparent 2px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 35%, transparent 100%)',
          }}
        />

        {/* Main content */}
        <div className="relative z-10">
          <Header />

          {/* Navigation */}
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

          {/* Page title - ADDED BOTTOM PADDING */}
          <div className="text-center mb-8 pb-16"> {/* Added pb-16 for spacing */}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"> {/* Changed from py-8 to py-4 */}
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

            {/* My Enrollments Toggle */}
            <Button
              variant={filterByMe ? "default" : "outline"}
              size="sm"
              className={filterByMe ? "bg-green-600 text-white" : "border-gray-300"}
              onClick={() => setFilterByMe(!filterByMe)}
            >
              My Enrollments
            </Button>
            
            {/* Reset Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-600 flex items-center space-x-1"
                onClick={resetAllFilters}
              >
                <span className="text-red-500">↻</span>
                <span>Reset Filter</span>
              </Button>
            </motion.div>
            
            {/* Search Box */}
            <div className="ml-auto flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <Search className="h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for Courses"
                className="bg-transparent border-none focus:ring-0 text-sm w-64"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Courses List */}
        {Object.entries(filteredTrainings).length > 0 ? (
          Object.entries(filteredTrainings).map(([month, monthTrainings]) => (
            <div key={month} className="mb-8">
              {/* Month Header */}
              <motion.div 
                className="flex items-center justify-between cursor-pointer mb-4"
                onClick={() => toggleMonthExpansion(month)}
                whileHover={{ x: 5 }}
              >
                <h3 className="text-xl font-medium text-gray-400">{month}</h3>
                {expandedMonth === month ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </motion.div>
              
              {/* Course Cards */}
              <AnimatePresence>
                {(expandedMonth === month || expandedMonth === null) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {monthTrainings.map((training) => (
                      <motion.div
                        key={training.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <Link to={`/training/${training.id}`}>
                          <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row">
                                {/* Course Image */}
                                <div className="w-full md:w-48 h-48 bg-gray-200 relative overflow-hidden">
                                  <img 
                                    src={getCourseImage(training)} 
                                    alt={training.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    onError={(e) => {
                                      e.currentTarget.src = '/course-images/default.jpg';
                                    }}
                                  />
                                  
                                  {/* Mode Badge */}
                                  <div className="absolute top-2 left-2 bg-white text-gray-800 text-xs px-2 py-1 rounded shadow-sm border flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>{getDisplayMode(training.location)}</span>
                                  </div>
                                  
                                  {/* Category Badge */}
                                  {training.category && (
                                    <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                                      {training.category}
                                    </div>
                                  )}
                                </div>
                                
                                {/* Course Details */}
                                <div className="flex-1 p-6">
                                  <div className="flex flex-col h-full justify-between">
                                    <div>
                                      {/* Title and Enrollment Status */}
                                      <div className="flex items-start justify-between">
                                        <h4 className="text-lg font-medium text-gray-900 mb-2">{training.title}</h4>
                                        {/* FIX: Use the helper function for consistent enrollment check */}
                                        {isUserEnrolled(training) && (
                                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded text-sm font-medium">
                                            Enrolled
                                          </span>
                                        )}
                                      </div>
                                      
                                      {/* Course Info */}
                                      <div className="mt-3 space-y-2">
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                          <div className="flex items-center space-x-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(training.startDate)}</span>
                                            <span>•</span>
                                            <span>{dayjs(training.startDate).format('dddd')}</span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <span className="font-medium">Mode:</span>
                                            <span className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium border shadow-sm flex items-center space-x-1">
                                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                              <span>{getDisplayMode(training.location)}</span>
                                            </span>
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                          {/* Location (for offline courses) */}
                                          {training.location && (
                                            <div className="flex items-center space-x-1">
                                              <MapPin className="h-4 w-4" />
                                              <span>{training.location}</span>
                                            </div>
                                          )}
                                          
                                          {/* Instructor Info */}
                                          {training.instructor && (
                                            <div className="flex items-center space-x-1">
                                              <span className="font-medium">Instructor:</span>
                                              <span>
                                                {training.instructor.firstName}
                                                {training.instructor.lastName && ` ${training.instructor.lastName}`}
                                                {training.instructor.institutionName && ` (${training.instructor.institutionName})`}
                                              </span>
                                            </div>
                                          )}
                                        </div>

                                        {/* Description */}
                                        {training.description && (
                                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                            {training.description}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    
                                    {/* Price and Action Buttons */}
                                    <div className="flex items-center justify-between mt-4">
                                      <div className="flex items-center space-x-1 text-lg font-semibold text-gray-900">
                                        <span>{formatPrice(training.cost)}</span>
                                      </div>
                                      
                                      <div className="flex items-center space-x-3">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>
                                            More Info
                                          </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button 
                                            className="bg-[#0389FF] hover:bg-[#0389FF]/90 text-white"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              navigate(`/training/${training.id}`);
                                            }}
                                          >
                                            {/* FIX: Use the helper function for consistent enrollment check */}
                                            {isUserEnrolled(training) ? 'VIEW COURSE' : 'REGISTER NOW'}
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
          // No Results Found
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
              onClick={resetAllFilters}
            >
              Reset all filters
            </Button>
          </motion.div>
        )}

        {/* Results Summary */}
        {Object.entries(filteredTrainings).length > 0 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-600">
              Showing {Object.values(filteredTrainings).flat().length} courses
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>‹</Button>
              <Button variant="outline" size="sm">›</Button>
            </div>
          </div>
        )}
      </div>

      {/* Counseling CTA Section */}
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