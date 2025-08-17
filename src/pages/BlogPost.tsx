import React from 'react';
import Header from '@/components1/Header';
import Footer from '@/components1/Footer';
import { ArrowLeft, Share2, Calendar, User, Clock, ExternalLink } from 'lucide-react';
import { Link,useNavigate, useParams } from 'react-router-dom';
import GridBackground from '@/components1/GridBackground';
import { Avatar, Button, Flex, Image, Text, Title } from "@mantine/core";
import BlogContent from "../components/BlogContent";
import { ChevronLeft } from "lucide-react";
import { api } from "../lib/api";
import { GenericError, GenericResponse } from "../lib/types";
import { Blog } from "./BlogListing";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Errorbox from "../components/Errorbox";
import { formatDate } from "../lib/utils";

function useBlog(slug: string) {
  return useQuery<GenericResponse<Blog>, AxiosError<GenericError>>({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const response = await api().get(`/blogs/${slug}`);
      return response.data;
    },
  });
};

// Helper function to check if a string is a valid URL
const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Helper function to format URL for display
const formatUrlForDisplay = (url: string) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + urlObj.pathname;
  } catch (_) {
    return url;
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if(!id) {
    navigate(-1);
  }
  const { data, isLoading, error } = useBlog(id!);

  if(isLoading) {
    return <Loading />;
  }

  if(error) {
    // @ts-expect-error - error is of type AxiosError
    return <Errorbox message={error.response?.data.error} />;
  }

  const blogPost = data?.data;
  return (
    <div className="min-h-screen bg-white">
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
        <Link to="/blog">
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
      
  </div>
</div>


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {blogPost.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blogPost.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{blogPost.blogAuthor.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(blogPost.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <div className="h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={blogPost.coverImage}
              alt={blogPost.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-xl text-gray-700 mb-8 font-medium">
            <BlogContent markdownContent={blogPost.content} />
          </div>
        </div>

        {/* References */}
        {blogPost.references && blogPost.references.length > 0 ? (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">References</h3>
            <div className="space-y-3">
              {blogPost.references.map((reference, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-gray-500 font-medium text-sm mt-1 flex-shrink-0">
                    [{index + 1}]
                  </span>
                  {isValidUrl(reference) ? (
                    <a
                      href={reference}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center space-x-1 break-all transition-colors"
                    >
                      <span>{formatUrlForDisplay(reference)}</span>
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
                  ) : (
                    <span className="text-gray-700 break-words">{reference}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">References</h3>
            <div className="text-gray-500 text-sm">
              No references available for this article.
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-3">About the Author</h3>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-gray-900">{blogPost.blogAuthor.name}</h4>
              <p className="text-gray-600 mt-2">{blogPost.blogAuthor.designation}</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {/* <div className="border-t pt-8">
          <h3 className="text-xl font-semibold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">Career Opportunities in Biotechnology</h4>
              <p className="text-gray-600 text-sm">A comprehensive guide to the growing field of biotechnology...</p>
            </div>
            <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">Research Methodologies in Modern Science</h4>
              <p className="text-gray-600 text-sm">Understanding the latest research methodologies...</p>
            </div>
          </div>
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
