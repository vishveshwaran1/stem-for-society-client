import FAQ from "../components1/FAQSection";
import Footer from "../components1/Footer";
import HomeCarousel from "../components1/Hero";
import OurFeatures from "../components1/ProgramStructure";
import Partners from "../components1/PartnersSection";
import ProgramsOffered from "../components1/ProgramStructure";
import ReviewCards from "../components1/TestimonialsSection";
import SectorsWeFocus from "../components1/SectorsSection";
import WhyChooseUs from "../components1/WhyChooseSection";

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
