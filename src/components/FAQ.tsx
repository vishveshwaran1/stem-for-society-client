import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    category: "General Information",
    questions: [
      {
        question: "What is 'Stem for Society'?",
        answer:
          "'Stem for Society' is an edutech platform focused on developing skills, offering internships, and enhancing employability in STEM fields through industry collaborations and innovative programs.",
      },
      {
        question: "Who can enroll in the programs?",
        answer:
          "Scientists, researchers, students (PhD, master's, bachelor's), and professionals aiming to excel in their careers are eligible to enroll.",
      },
      {
        question: "What distinguishes 'Stem for Society' from other platforms?",
        answer:
          "Our platform combines industry-driven training, mentorship, and real-world problem-solving with a focus on scientific communication and career guidance.",
      },
    ],
  },
  {
    category: "Training Programs",
    questions: [
      {
        question: "What industries are covered under the training programs?",
        answer:
          "Industries like Lifesciences, pharmaceuticals, data science, Bioinformatics, and computational biology, focusing on current market trends.",
      },
      {
        question: "Are custom training programs available?",
        answer:
          "Yes, we design custom programs tailored to specific industries and organizational needs upon request.",
      },
      {
        question: "Do you provide placement support after training?",
        answer:
          "Yes, we have collaborations with industry partners to assist participants with placement opportunities.",
      },
    ],
  },
  {
    category: "Internships",
    questions: [
      {
        question: "Are internships project-based?",
        answer:
          "Yes, all internships are designed to be project-based, enabling participants to gain hands-on experience while solving real-world challenges.",
      },
      {
        question: "Can interns get a recommendation letter upon completion?",
        answer:
          "Yes, interns who perform well receive recommendation letters from their mentors or industry supervisors.",
      },
      {
        question: "How are internships evaluated?",
        answer:
          "Evaluations are based on project outcomes, participation, and feedback from supervisors.",
      },
    ],
  },
  {
    category: "Skill Development",
    questions: [
      {
        question: "What specific skills can I gain through these programs?",
        answer:
          "Participants gain technical expertise, critical thinking, problem-solving abilities, communication skills, and confidence for tackling real-world challenges.",
      },
      {
        question: "Are there programs for soft skills development?",
        answer:
          "Yes, alongside technical skills, we offer modules on leadership, teamwork, and professional communication.",
      },
    ],
  },
  {
    category: "Scientific Communication",
    questions: [
      {
        question: "How can blogging help my career?",
        answer:
          "Blogging through 'Stem for Society' enhances your visibility as a thought leader, improves communication skills, and showcases your expertise to peers and employers.",
      },
      {
        question: "Are there workshops on writing for the general public?",
        answer:
          "Yes, we conduct workshops focused on simplifying complex scientific ideas for a non-specialist audience.",
      },
    ],
  },
  {
    category: "Certification",
    questions: [
      {
        question: "Are all certifications co-branded with industry partners?",
        answer:
          "Yes, certifications feature our brand and our partnering organizations, boosting their credibility and recognition.",
      },
      {
        question: "Do certifications include a unique verification code?",
        answer:
          "Yes, all certificates come with a unique verification code that can be used to validate authenticity.",
      },
    ],
  },
  {
    category: "Support and Resources",
    questions: [
      {
        question: "What resources are available for career guidance?",
        answer:
          "We provide career guidance resources, including resume-building tips, interview preparation, and access to career counselors.",
      },
      {
        question: "Are live Q&A sessions with mentors available?",
        answer:
          "Yes, we regularly host live Q&A sessions with mentors to address participant queries and offer guidance.",
      },
    ],
  },
  {
    category: "Networking Opportunities",
    questions: [
      {
        question: "How does 'Stem for Society' help with networking?",
        answer:
          "We organize events, webinars, and forums where participants can connect with peers, industry professionals, and mentors.",
      },
    ],
  },
  {
    category: "Partnerships",
    questions: [
      {
        question: "How can organizations or institutions collaborate?",
        answer:
          "Organizations can collaborate by providing training modules, sponsoring internships, or participating in joint research initiatives.",
      },
    ],
  },
];

/** Generated by ChatGPT. Just uploaded a docx with questions and GPT spit out this component in like 2 prompts.. */
const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [openCategoryIndex, setOpenCategoryIndex] = useState<string | null>(
    null,
  );

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleCategory = (index: string) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-2">
      {faqs.map((section, sectionIndex) => {
        const isCategoryOpen = openCategoryIndex === `${sectionIndex}`;
        return (
          <div key={sectionIndex} className="mb-6">
            <button
              onClick={() => toggleCategory(`${sectionIndex}`)}
              className="w-full text-left flex justify-between"
            >
              <h2 className="text-lg font-semibold mb-2 text-blue-600">
                {section.category}
              </h2>
              {isCategoryOpen ? (
                <ChevronUp className="transition-transform duration-300 text-blue-500" />
              ) : (
                <ChevronDown className="transition-transform duration-300 text-blue-500" />
              )}
            </button>
            <div
              className={`border-l-4 border-blue-400 pl-4 overflow-hidden transition-all duration-300 ${
                isCategoryOpen
                  ? "max-h-64 opacity-100 p-3"
                  : "max-h-0 opacity-0"
              } rounded-md`}
            >
              {section.questions.map((faq, index) => {
                const isOpen = openIndex === `${sectionIndex}-${index}`;
                return (
                  <div key={index} className="mb-4">
                    <button
                      className="w-full text-left font-medium flex items-center justify-between bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition duration-200"
                      onClick={() => toggleFAQ(`${sectionIndex}-${index}`)}
                    >
                      {faq.question}
                      {isOpen ? (
                        <ChevronUp className="transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="transition-transform duration-300" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "max-h-40 opacity-100 p-3"
                          : "max-h-0 opacity-0"
                      } bg-gray-50 border border-gray-200 rounded-md`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQComponent;
