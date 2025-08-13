import { TbCalendarTime } from "react-icons/tb";
import { cn } from "../lib/utils";
import { MdOutlineLocationOn } from "react-icons/md";

const features = [
  {
    title: "Seminar / Webinar / Mentorship",
    description: (
      // "Regular Interaction related to Career Guidance, Current trends, Experts talks and Mentorships",
      <ul className="list-disc text-gray-600 text-left ml-4">
        <li>One on One Mentorship with Experts</li>{" "}
        <li>Understanding the Interest</li>
        <li>Right career Guidance</li> <li>Accuracy-Driven Training</li>
      </ul>
    ),
    bgColor: "bg-[#A8CFFF]",
    iconColor: "text-sky-500",
    textColor: "text-sky-700",
    icon: "/seminar.png",
  },
  {
    title: "Certificate Program",
    superHeading: "Basic",
    description: "Courses designed by Experienced mentors",
    duration: "1 to 3 days",
    location: "online",
    bgColor: "bg-[#E3F2FD]",
    iconColor: "text-fuchsia-500",
    textColor: "text-sky-700",
    icon: "/certificate-program.png",
  },
  {
    title: "Corporate Training Program",
    superHeading: "Advanced",
    description: "Industrial design Courses to enhance employment skills",
    duration: "3 to 10 days",
    location: "hybrid",
    bgColor: "bg-[#D6E4FF]",
    iconColor: "text-emerald-500",
    textColor: "text-sky-700",
    icon: "/corporate-training.png",
  },
  // {
  //   title: "Academic Training Program",
  //   description: "Courses in Collaboration with Universities and Institutes",
  //   bgColor: "bg-[#CDE1F7]",
  //   iconColor: "text-amber-500",
  //   textColor: "text-sky-700",
  //   icon: "/academic.png",
  // },
  {
    title: "Instrumentation Hands-on",
    superHeading: "Hands-on training",
    description: (
      // "Regular Interaction related to Career Guidance, Current trends, Experts talks and Mentorships",
      <ul className="list-disc text-gray-600 text-left ml-4">
        <li>Real Time Experiments /Instrumentation</li>{" "}
        <li>Hands-on in Collaboration with Industry/academia</li>
      </ul>
    ),
    duration: "1 week to 1 month",
    location: "offline",
    bgColor: "bg-[#BFD9FF]",
    iconColor: "text-purple-500",
    textColor: "text-sky-700",
    icon: "/instrumentation.png",
  },
];

export default function ProgramsOffered() {
  return (
    <div className="py-12 px-6">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Our program structure
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-lg flex flex-col shadow-md p-6 py-12 pb-6 text-center hover:shadow-lg transition-shadow",
                feature.bgColor,
              )}
            >
              {"superHeading" in feature && (
                <h4 className="text-xl text-blue-900 mb-2">
                  {feature.superHeading}
                </h4>
              )}
              <div className="text-6xl mb-4 w-full grid place-items-center">
                <img src={feature.icon} alt="" />
              </div>
              <h3
                className={cn(
                  "text-xl font-semibold text-gray-800 mb-2",
                  feature.textColor,
                )}
              >
                {feature.title}
              </h3>
              {typeof feature.description === "string" ? (
                <p className="text-gray-600">{feature.description}</p>
              ) : (
                feature.description
              )}
              <div className="my-3"></div>
              {"duration" in feature && "location" in feature && (
                <div className="grid grid-cols-2 relative isolate justify-center gap-6 rounded-full mt-auto border border-blue-500 p-3">
                  <hr className="border-none bg-blue-500 w-[1px] absolute h-full top-0 left-1/2" />
                  <div className="flex items-center gap-3">
                    <TbCalendarTime size={22} className="text-blue-400 " />
                    <div className="grid text-xs text-center ">
                      <span className="text-sm font-semibold">Duration</span>{" "}
                      {feature.duration}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdOutlineLocationOn size={22} className="text-blue-400 " />
                    <div className="grid text-xs text-center">
                      <span className="text-sm font-semibold">Mode</span>{" "}
                      {feature.location}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
