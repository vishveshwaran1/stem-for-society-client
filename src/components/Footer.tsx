import { Link } from "react-router-dom";
import logo from "/logo-01.png";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

const column1Links = [
  { name: "Home", url: "/home" },
  { name: "Courses/Trainings", url: "/training" },
  { name: "Pricing", url: "/pricing" },
];

const column2Links = [
  { name: "Sign In", url: "/login" },
  { name: "Register", url: "/signup" },
  { name: "Privacy Policy", url: "/privacy-policy" },
  { name: "Refund policy", url: "/refund-policy" },
];

const socialLinks = [
  {
    icon: <BsInstagram />,
    label: "Instagram",
    link: "https://www.instagram.com/esf_life_science_jobs/",
  },
  {
    icon: <BsTwitter />,
    label: "Twitter",
    link: "https://twitter.com/EmpoweringSci",
  },
  {
    icon: <BsYoutube />,
    label: "Youtube",
    link: "https://www.youtube.com/@stemforsociety",
  },
];

export default function Footer() {
  return (
    <footer className="shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-8 min-w-full left-0 bg-sky-200">
      <div className="container mx-auto flex flex-col lg:flex-row justify-around lg:items-start gap-8">
        {/* Logo Section */}
        <div className="lg:mx-0 mx-auto">
          <img src={logo} alt="Logo" className="w-44" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {column1Links.map((link) => (
              <li key={link.url}>
                <Link
                  to={link.url}
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2">
            {column2Links.map((link) => (
              <li key={link.url}>
                <Link
                  to={link.url}
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Our Socials
          </h3>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                to={social.link}
                target="_blank"
                className="text-gray-700 text-xl flex gap-2 items-center hover:text-blue-500 transition-colors"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} STEM for society. All rights reserved.
      </div>
    </footer>
  );
}
