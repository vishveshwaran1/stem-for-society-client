import CountUp from "react-countup";

const data = [
  {
    count: 22000,
    description: "Trained Individuals",
  },
  {
    count: 70,
    description: "Industry Partners",
  },
  {
    count: 40,
    description: "Institution Partners",
  },
];

function WhyChooseUs() {
  return (
    <div className="text-center flex flex-col gap-2 justify-center py-8 my-24">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
        Why Choose Us
      </h2>
      <p className="mb-8">
        We give you compelling reasons to choose STEM for society
      </p>
      <div className="flex items-center justify-center w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 rounded-lg">
          {data.map((item, index) => (
            <div
              key={index}
              className={`w-full grid place-items-center gap-2 rounded-lg max-w-sm p-8 px-12 mx-auto`}
            >
              <img src={`whych${index + 1}.png`} alt="" />
              <h3
                className={`text-2xl flex items-center gap-2 mt-1 w-full justify-center sm:text-3xl md:text-4xl font-bold text-sky-600`}
              >
                <CountUp
                  end={item.count}
                  enableScrollSpy
                  scrollSpyDelay={300}
                />
                +
              </h3>
              <span
                className={`block text-base sm:text-lg md:text-xl text-sky-900`}
              >
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
