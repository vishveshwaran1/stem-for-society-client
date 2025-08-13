
import { useState } from "react";
import { Card, CardContent } from "@/components1/ui/card";
import { Badge } from "@/components1/ui/badge";
import { Button } from "@/components1/ui/button";
import { BookOpen, Award, Users, TestTube, Calendar, Monitor, ChevronDown, ChevronUp } from "lucide-react";

const ProgramStructure = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const programStructure = [
    {
      title: "General",
      subtitle: "Seminar / Webinar / Mentorship",
      duration: "Frequently",
      features: ["Both Online + Offline"],
      hoverSubtitle: "Stay Connected with Industry Trends",
      hoverDuration: "Weekly Sessions",
      hoverFeatures: ["Live Q&A", "Expert Networking"],
      icon: <BookOpen className="h-5 w-5 text-[#0389FF]" />,
      expandedContent: {
        description: "Join our regular seminars and webinars to stay updated with the latest industry trends and connect with experts.",
        highlights: ["Expert speakers", "Interactive sessions", "Networking opportunities", "Certificate of participation"]
      }
    },
    {
      title: "Basic", 
      subtitle: "Certificate Program",
      duration: "1 to 3 days",
      features: ["Online 100% training"],
      hoverSubtitle: "Foundation Skills Development",
      hoverDuration: "Self-Paced Learning",
      hoverFeatures: ["24/7 Support", "Lifetime Access"],
      icon: <Award className="h-5 w-5 text-[#0389FF]" />,
      expandedContent: {
        description: "Get certified with our comprehensive basic programs designed for beginners and professionals looking to upskill.",
        highlights: ["Industry-recognized certificate", "Self-paced learning", "24/7 support", "Lifetime access"]
      }
    },
    {
      title: "Standard",
      subtitle: "Corporate Training Program",
      duration: "3 to 10 days",
      features: ["Online + Offline 100% LIVE training"],
      hoverSubtitle: "Team Excellence Programs",
      hoverDuration: "Intensive Bootcamp",
      hoverFeatures: ["Custom Curriculum", "Team Assessment"],
      icon: <Users className="h-5 w-5 text-[#0389FF]" />,
      expandedContent: {
        description: "Intensive corporate training programs designed to enhance team skills and organizational capabilities.",
        highlights: ["Customized curriculum", "Team assessments", "Progress tracking", "Corporate certification"]
      }
    },
    {
      title: "Advanced",
      subtitle: "Instrumentation Hands-on",
      duration: "3 to 10 days",
      features: ["Offline 100% LIVE training"],
      hoverSubtitle: "Professional Lab Experience",
      hoverDuration: "Intensive Practical",
      hoverFeatures: ["Real Equipment", "Expert Mentorship"],
      icon: <TestTube className="h-5 w-5 text-[#0389FF]" />,
      expandedContent: {
        description: "Advanced hands-on training with real instruments and equipment for practical learning experience.",
        highlights: ["Real equipment training", "Lab access", "Expert mentorship", "Project-based learning"]
      }
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const ArrowWithTail = () => (
    <div className="absolute top-3 right-3 flex items-center">
     <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect y="30" width="30" height="30" rx="15" transform="rotate(-90 0 30)" fill="#F2F2F2"/>
  <path d="M8.3418 10.0098L8.3706 21.0874L19.4482 21.1161C19.5636 21.1318 19.6811 21.1224 19.7926 21.0888C19.904 21.0551 20.007 20.9977 20.0944 20.9209C20.1818 20.844 20.2517 20.7491 20.2993 20.6427C20.3469 20.5364 20.3711 20.4212 20.3703 20.3047C20.3695 20.1882 20.3436 20.0733 20.2945 19.9677C20.2454 19.8621 20.1741 19.7683 20.0856 19.6926C19.9971 19.617 19.8934 19.5611 19.7814 19.529C19.6695 19.4969 19.5519 19.4892 19.4368 19.5065L11.1357 19.4721L22.1328 8.4749C22.2853 8.3224 22.371 8.1156 22.371 7.9001C22.371 7.6844 22.2853 7.4777 22.1328 7.3252C21.9804 7.1727 21.7736 7.0871 21.558 7.0871C21.3424 7.0871 21.1356 7.1727 20.9831 7.3252L9.986 18.3223L9.9515 10.0213C9.9507 9.8056 9.8643 9.5989 9.7112 9.447C9.5581 9.295 9.3509 9.2099 9.1352 9.2107C8.9195 9.2115 8.7128 9.2979 8.5608 9.451C8.4088 9.6041 8.3237 9.8113 8.3245 10.027L8.3418 10.0098Z" fill="#0389FF"/>
</svg>
    </div>
  );

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Program Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {programStructure.map((program, index) => (
            <Card key={index} className="p-4 bg-white border border-gray-200 rounded-xl relative transition-all duration-300 hover:shadow-md hover:bg-[#0389FF] group cursor-pointer">
              <ArrowWithTail />
              <CardContent className="p-0">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-500 transition-colors">
                    <div className="group-hover:[&>svg]:text-white transition-colors">
                      {program.icon}
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`rounded-full px-3 py-1 text-xs group-hover:bg-blue-500 group-hover:text-white transition-colors ${
                      index === 0 ? 'bg-gray-100 text-gray-700' :
                      index === 1 ? 'bg-blue-100 text-blue-700' :
                      index === 2 ? 'bg-gray-100 text-gray-700' :
                      'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {program.title}
                  </Badge>
                </div>
                
                <div className="transition-all duration-300">
                  <div className="group-hover:hidden">
                    <h3 className="font-semibold text-sm mb-2">{program.subtitle}</h3>
                    
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>{program.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
                      <Monitor className="h-3 w-3" />
                      <span>{program.features[0]}</span>
                    </div>
                  </div>
                  
                  <div className="hidden group-hover:block">
                    <h3 className="font-semibold text-sm mb-2 text-white">{program.hoverSubtitle}</h3>
                    
                    <div className="flex items-center gap-2 mb-3 text-xs text-blue-100">
                      <Calendar className="h-3 w-3" />
                      <span>{program.hoverDuration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3 text-xs text-blue-100">
                      <Monitor className="h-3 w-3" />
                      <span>{program.hoverFeatures[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedCard === index && (
                  <div className="mb-3 p-3 bg-blue-50 group-hover:bg-blue-500 rounded-xl animate-fade-in transition-colors">
                    <p className="text-xs text-gray-700 group-hover:text-blue-100 mb-2">{program.expandedContent.description}</p>
                    <div className="space-y-1">
                      {program.expandedContent.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-600 group-hover:text-blue-100">
                          <div className="w-1 h-1 bg-[#0389FF] group-hover:bg-blue-200 rounded-full mr-2"></div>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs py-2 h-8 rounded-xl group-hover:bg-transparent group-hover:border-white group-hover:text-white transition-colors"
                    onClick={() => toggleExpanded(index)}
                  >
                    <span className="mr-1">More info</span>
                    {expandedCard === index ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </Button>
                  {expandedCard === index && (
                    <Button 
                      size="sm" 
                      className="text-xs py-2 h-8 bg-[#0389FF] hover:bg-[#0389FF]/90 group-hover:bg-white group-hover:text-[#0389FF] transition-colors rounded-xl"
                    >
                      START LEARNING
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramStructure;
