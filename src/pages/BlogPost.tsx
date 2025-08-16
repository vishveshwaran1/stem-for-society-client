
import React from 'react';
import Header from '@/components1/Header';
import Footer from '@/components1/Footer';
import { Button } from '@/components1/ui/button';
import { ArrowLeft, Share2, Calendar, User, Clock } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import GridBackground from '@/components1/GridBackground';

const BlogPost = () => {
  const { id } = useParams();
  
  // Mock blog post data - in real app this would come from API or database
  const blogPost = {
    id: id || '1',
    title: 'The Future of STEM Education: How Technology is Transforming Learning',
    excerpt: 'Exploring how technology is transforming the way we learn science, technology, engineering, and mathematics.',
    content: `
      <p>In the rapidly evolving landscape of education, Science, Technology, Engineering, and Mathematics (STEM) fields are experiencing unprecedented transformation. The integration of cutting-edge technologies is revolutionizing how students learn, teachers instruct, and researchers innovate.</p>
      
      <h3>The Digital Revolution in STEM</h3>
      <p>Virtual laboratories, augmented reality simulations, and AI-powered tutoring systems are becoming commonplace in modern STEM education. These tools provide students with immersive experiences that were previously impossible or impractical in traditional classroom settings.</p>
      
      <h3>Personalized Learning Pathways</h3>
      <p>Artificial intelligence and machine learning algorithms are enabling personalized learning experiences that adapt to each student's pace, learning style, and areas of interest. This individualized approach is proving to be more effective than traditional one-size-fits-all methods.</p>
      
      <h3>Global Collaboration and Access</h3>
      <p>Online platforms and collaboration tools are breaking down geographical barriers, allowing students from around the world to work together on projects, share resources, and learn from diverse perspectives.</p>
      
      <h3>The Future Landscape</h3>
      <p>As we look ahead, the convergence of emerging technologies like quantum computing, biotechnology, and nanotechnology will continue to reshape STEM education. Preparing students for this future requires adaptive curricula and innovative teaching methodologies.</p>
    `,
    author: 'Dr. Sarah Johnson',
    authorBio: 'Professor of Educational Technology at MIT and researcher in STEM pedagogy',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Education',
    image: '/placeholder.svg',
    tags: ['STEM', 'Education', 'Technology', 'Future Learning']
  };

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
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(blogPost.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{blogPost.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <div className="h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-xl text-gray-700 mb-8 font-medium">
            {blogPost.excerpt}
          </div>
          
          <div 
            className="text-gray-800 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-3">About the Author</h3>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-gray-900">{blogPost.author}</h4>
              <p className="text-gray-600 mt-2">{blogPost.authorBio}</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="border-t pt-8">
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
