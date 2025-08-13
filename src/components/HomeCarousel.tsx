import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import banner from "/banner.mp4";

const carouselData = [
  {
    videoSrc: banner,
    title: (
      <>
        <span className="text-blue-400">STEM</span> for Society
      </>
    ),
    subtitle: "Let's INNOVATE, INCUBATE, and IMPACT the world together!",
    videoClassName: "w-full object-cover z-50",
  },
  {
    videoSrc: "/8716579-hd_1280_720_25fps.mp4",
    title: (
      <>
        <span className="text-blue-400">Classroom</span> learning
      </>
    ),
    videoClassName: "w-full object-cover",
  },
  {
    videoSrc: "/3255275-hd_1280_720_25fps.mp4",
    title: (
      <>
        <span className="text-blue-400">Career & Psychology</span> Counselling
      </>
    ),
    videoClassName: "w-full object-cover",
  },
  {
    videoSrc: "/8381459-hd_1280_720_25fps.mp4",
    title: (
      <>
        <span className="text-blue-400">Hands-on</span> training
      </>
    ),
    videoClassName: "w-full object-cover",
  },
];

export default function HomeCarousel() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <div className="relative lg:aspect-[none] aspect-video w-full flex justify-center items-center">
      <Carousel
        withIndicators
        classNames={{
          controls: "z-50 text-black",
          control: "shadow bg-white",
        }}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        loop
        className="relative lg:h-full w-full"
      >
        {carouselData.map((slide, index) => (
          <Carousel.Slide key={index}>
            <video
              className={slide.videoClassName}
              src={slide.videoSrc}
              autoPlay
              loop
              muted
            ></video>
            <div className="absolute lg:top-0 top-1/2 lg:translate-y-[none] -translate-y-1/2 left-0 h-[26vh] lg:h-full w-full bg-black/50 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold text-white">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p
                  className="text-sm sm:text-lg md:text-xl lg:text-2xl mt-4 sm:mt-6 text-white"
                  style={{ fontFamily: '"Open Sans", sans-serif' }}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
