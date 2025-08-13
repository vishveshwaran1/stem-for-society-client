import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import HomeCarousel from "../components/HomeCarousel";
import OurFeatures from "../components/OurFeatures";
import Partners from "../components/Partners";
import ProgramsOffered from "../components/ProgramsOffered";
import ReviewCards from "../components/Reviews";
import SectorsWeFocus from "../components/SectorsWeFocus";
import WhyChooseUs from "../components/WhyChooseUs";

function Home() {
  return (
    <div>
      {/* Banner Section */}
      <HomeCarousel />

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-6">
        <SectorsWeFocus />
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-6">
        <ProgramsOffered />
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-6">
        <OurFeatures />
      </div>

      {/* Partners Section */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-6">
        <Partners />
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-6">
        <WhyChooseUs />
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-6">
        <ReviewCards />
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-6">
        <h2 className="text-2xl font-semibold text-center">FAQs</h2>
        <FAQ />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
