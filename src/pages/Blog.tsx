import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components1/ui/button';
import { Input } from '@/components1/ui/input';
import { Search, Plus, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components1/Header';
import Footer from '@/components1/Footer';
import { AxiosError } from "axios";
import Errorbox from "../components/Errorbox";
import { api } from "../lib/api";
import { GenericError, GenericResponse } from "../lib/types";
import { formatDate } from "../lib/utils";

export type Blog = {
  id: string;
  slug: string;
  reference: string[];
  category: string;
  title: string;
  content: string;
  createdAt: string;
  coverImage: string;
  blogAuthor: {
    name: string;
    linkedin: string;
    designation?: string;
  }
}

function useBlog() {
  return useQuery<GenericResponse<Blog[]>, AxiosError<GenericError>>({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await api().get('/blogs');
      return response.data;
    },
    staleTime: 1000 * 60 * 300, // 5 minutes
  });
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: blogPosts, isLoading, error } = useBlog();
  
  if (error) { 
    //@ts-expect-error - error is of type AxiosError
    return <Errorbox message={error.response?.data.error || 'An error occurred'} />;
  }
  
  const blogs = isLoading ? [] : blogPosts?.data || [];

  // Filter blogs based on search query with null/undefined checks
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = blogs.filter(blog => {
        // Safe string comparisons with null/undefined checks
        const title = blog.title?.toLowerCase() || '';
        const content = blog.content?.toLowerCase() || '';
        const authorName = blog.blogAuthor?.name?.toLowerCase() || '';
        const category = blog.category?.toLowerCase() || '';
        const designation = blog.blogAuthor?.designation?.toLowerCase() || '';

        return (
          title.includes(query) ||
          content.includes(query) ||
          authorName.includes(query) ||
          category.includes(query) ||
          designation.includes(query)
        );
      });
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => 
        blog.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    return filtered;
  }, [blogs, searchQuery, selectedCategory]);

  const categories = ["All", "Education", "Career", "Research", "Technology", "Innovation"];

  // Show loading skeleton while data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
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
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Explore Articles</h1>
              <h2 className="text-3xl font-bold text-gray-900">Scientific Communication Platform</h2>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Explore Articles</h1>
            <h2 className="text-3xl font-bold text-gray-900">Scientific Communication Platform</h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Search and Create Article Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-gray-50 border-0 rounded-full"
            />
          </div>
          <Link to="/blog-article">
            <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-full">
              <Plus className="w-5 h-5 mr-2" />
              Create Article
            </Button>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full ${
                category === selectedCategory
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Search Results Info */}
        {(searchQuery.trim() || selectedCategory !== 'All') && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredBlogs.length > 0 
                ? `Found ${filteredBlogs.length} article${filteredBlogs.length === 1 ? '' : 's'}${
                    searchQuery.trim() ? ` for "${searchQuery}"` : ''
                  }${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
                : `No articles found${
                    searchQuery.trim() ? ` for "${searchQuery}"` : ''
                  }${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
              }
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <Link key={post.id} to={`/blog-post/${post.slug}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={post.coverImage || '/placeholder-image.jpg'}
                    alt={post.title || 'Blog post'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                  {post.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {post.title || 'Untitled Article'}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span>{post.blogAuthor?.name || 'Anonymous'}</span>
                      <span>•</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {(searchQuery.trim() || selectedCategory !== 'All') && filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or browse all articles
            </p>
            <div className="flex gap-2 justify-center">
              {searchQuery.trim() && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery('')}
                  className="bg-white hover:bg-gray-50 border-gray-300"
                >
                  Clear Search
                </Button>
              )}
              {selectedCategory !== 'All' && (
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory('All')}
                  className="bg-white hover:bg-gray-50 border-gray-300"
                >
                  Show All Categories
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Load More Button - Only show when not filtering */}
        {!searchQuery.trim() && selectedCategory === 'All' && filteredBlogs.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-300 px-8 py-3">
              Load More Articles
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
