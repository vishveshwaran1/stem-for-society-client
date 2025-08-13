const OurFeatures = () => {
  const features = [
    {
      title: "World Class Instructors",
      description:
        "Learn from top industry professionals with real-world experience.",
      icon: <img className="w-auto h-40" src="/instructor.webp" />,
    },
    {
      title: "1 on 1 Mentorship",
      description: "Expert-Led, Accuracy-Focused Learning",
      icon: <img className="w-auto h-40" src="/mentor.webp" />,
    },
    {
      title: "Industrial Training",
      description: "Data-Backed, High-Precision Training",
      icon: <img className="w-auto h-40" src="/projects.webp" />,
    },
    {
      title: "Placement Assistant",
      description: "Fine-Tuned for Maximum Precision",
      icon: <img className="w-auto h-40" src="/job.webp" />,
    },
  ];

  return (
    <div className="py-12 my-20 px-6 rounded-lg">
      <div className="max-w-7xl mx-auto pb-8">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Why Choose STEM for Society
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg p-2 h-52 flex flex-col justify-end relative isolate text-center"
            >
              <img
                src={`/feature${index + 1}.png`}
                alt="feature"
                className="absolute -z-10 w-[360px] top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2"
              />
              <div className="absolute w-full h-[40%] opacity-50 bottom-0 -z-[5] left-0 bg-[rgb(14,0,255,0.04)] bg-[linear-gradient(180deg,_rgba(14,0,255,0)_0%,_rgba(0,0,0,0.8655111702884278)_54%,_rgba(7,108,255,0)_100%)]" />
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-white mb-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
