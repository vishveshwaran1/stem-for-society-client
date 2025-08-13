
import { Button } from "@/components1/ui/button";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#00549F' }} className="text-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Left Section - Logo and Address */}
          <div className="lg:w-full space-y-4">
            {/* Logo and Brand */}
            <div className="p-4 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <div className="h-24 w-24 flex items-center justify-center p-2">
                  <img 
                    src="/lovable-uploads/FooterLogo.png" 
                    alt="STEM for Society Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-3xl font-bold">STEM FOR SOCIETY</div>
                  <div className="text-2xl text-blue-100">Let's Innovate, Incubate and Impact the world together!</div>
                </div>
              </div>
            </div>
          </div>

        {/* Main Content Section - Efficient Layout */}
<div className="flex flex-col lg:flex-row lg:justify-between items-start gap-10 px-4 py-6">

  {/* Navigation Links - Take 3/4 on large screens */}
  <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
    
    {/* Programs */}
    <div>
      <h4 className="font-semibold mb-3 text-white">PROGRAMS</h4>
      <ul className="space-y-2 text-blue-100">
        <li><a href="/training" className="hover:text-white transition-colors">Explore Courses</a></li>
        <li><a href="#" className="hover:text-white transition-colors">Psychology counselling</a></li>
        <li><a href="#" className="hover:text-white transition-colors">Career counselling</a></li>
      </ul>
    </div>

    {/* For Institutions */}
    <div>
      <h4 className="font-semibold mb-3 text-white">FOR INSTITUTIONS</h4>
      <ul className="space-y-2 text-blue-100">
        <li><a href="#" className="hover:text-white transition-colors">Plans and pricings</a></li>
        <li><a href="#" className="hover:text-white transition-colors">Campus Ambassador Program</a></li>
      </ul>
    </div>

    {/* Community */}
    <div>
      <h4 className="font-semibold mb-3 text-white">COMMUNITY</h4>
      <ul className="space-y-2 text-blue-100">
        <li><a href="#" className="hover:text-white transition-colors">Join Community</a></li>
        <li><a href="#" className="hover:text-white transition-colors">Scientific Communication Blog</a></li>
        <li><a href="https://www.youtube.com/@stemforsociety" className="hover:text-white transition-colors">Our Youtube Channel</a></li>
      </ul>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="font-semibold mb-3 text-white">QUICK LINKS</h4>
      <ul className="space-y-2 text-blue-100">
        <li><a href="/signup" className="hover:text-white transition-colors">Register</a></li>
        <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
      </ul>
    </div>
  </div>

  {/* Newsletter - Take 1/4 width on large screens */}
  <div className="w-full lg:w-1/4">
    <h4 className="font-semibold mb-3 text-white text-sm">SUBSCRIBE FOR THE LATEST UPDATES</h4>
    <div className="space-y-3">
      <div>
        <label className="block text-sm text-blue-100 mb-1">First name</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm transition-all duration-300"
        />
      </div>
      <div>
        <label className="block text-sm text-blue-100 mb-1">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm transition-all duration-300"
        />
      </div>
      <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-xl font-medium text-sm w-full transition-all duration-300 hover:scale-105">
        Subscribe
      </Button>
    </div>
  </div>

</div>

{/* Full Row Wrapper */}
<div className="relative w-full mt-6">

  {/* Address on the left */}
  <div className="text-sm text-blue-100 space-y-1 text-center md:text-left md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2">
    <div>217 Broadway, Floor 9, New York, NY 10007</div>
    <div>844-402-4344</div>
    <div>support@tomorrowhealth.com</div>
  </div>

  {/* Social Icons in center */}
  <div className="flex justify-center space-x-4">
    <a href="https://twitter.com/EmpoweringSci" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-300 hover:scale-110">
      <Twitter className="h-5 w-5 text-blue-600" />
    </a>
    <a href="https://www.instagram.com/esf_life_science_jobs/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-300 hover:scale-110">
      <Instagram className="h-5 w-5 text-blue-600" />
    </a>
    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-300 hover:scale-110">
      <Linkedin className="h-5 w-5 text-blue-600" />
    </a>
    <a href="https://www.youtube.com/@stemforsociety" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-300 hover:scale-110">
      <Youtube className="h-5 w-5 text-blue-600" />
    </a>
  </div>

</div>



        {/* Bottom Section */}
        <div className=" pt-12 rounded-t-xl">
          {/* Copyright */}
          <div className="text-center text-sm text-blue-100">
            © 2025 STEM for society. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
