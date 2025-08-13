import { Badge } from "@mantine/core";

export default function CareerCounPricingPage() {
  return (
    <section>
      <div className="container mx-auto px-4 lg:w-[80%]">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-14">
          Plans & Pricing
        </h2>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Plan */}
          <div className="border flex flex-col rounded-lg p-6 shadow-sm bg-white">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                {/* Icon Placeholder */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 ml-3">
                Standard
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Essential Skills to Shape a Promising Future.
            </p>
            <p className="text-3xl font-semibold text-gray-800 mb-6">₹30,000</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>
                Extensive candidate profile review
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Shortlisting of
                Labs & University
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Enhancing SOP &
                LOR
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Refining Research
                proposal
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Guidance for
                application
              </li>
            </ul>
            <button
              // onClick={() => setregModalData({ open: true, plan: "Basics" })}
              className="w-full mt-auto py-2 px-4 border border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-100"
            >
              Get Started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border flex flex-col rounded-lg p-6 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center">
                {/* Icon Placeholder */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <h3 className="text-xl flex gap-3 items-center font-semibold text-gray-800 ml-3">
                Premium
                <Badge>Best offer</Badge>
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Comprehensive Training for a Brighter Tomorrow.
            </p>
            <p className="text-3xl font-semibold text-gray-800 mb-6">₹50,000</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Extensive
                candidate profile review
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Shortlisting of
                Labs & University
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Enhancing SOP &
                LOR
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Refining Research
                proposal
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Guidance for
                application
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Connecting with
                Experts
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Interview
                readiness Program
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✔</span>Guidance for
                Funding
              </li>
            </ul>
            <button
              // onClick={() => setregModalData({ open: true, plan: "Basics" })}
              className="w-full mt-auto py-2 px-4 border border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-100"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
