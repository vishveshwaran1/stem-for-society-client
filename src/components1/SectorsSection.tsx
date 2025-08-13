
import { 
  CloudRain, 
  Laptop, 
  Microscope, 
  Lightbulb, 
  DollarSign, 
  Pill, 
  Wheat, 
  Briefcase, 
  Heart, 
  Stethoscope, 
  Shield, 
  Leaf 
} from "lucide-react";

const SectorsSection = () => {
  // Updated star component with the specified design
  const FourCornerStar = () => (
    <div><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.0621 1.53451C18.3843 0.663889 19.6157 0.663888 19.9379 1.53451L24.2422 13.1669C24.3435 13.4407 24.5593 13.6565 24.8331 13.7578L36.4655 18.0621C37.3361 18.3843 37.3361 19.6157 36.4655 19.9379L24.8331 24.2422C24.5593 24.3435 24.3435 24.5593 24.2422 24.8331L19.9379 36.4655C19.6157 37.3361 18.3843 37.3361 18.0621 36.4655L13.7578 24.8331C13.6565 24.5593 13.4407 24.3435 13.1669 24.2422L1.53451 19.9379C0.663889 19.6157 0.663888 18.3843 1.53451 18.0621L13.1669 13.7578C13.4407 13.6565 13.6565 13.4407 13.7578 13.1669L18.0621 1.53451Z" fill="#00549F"/>
</svg>
    </div>
  );

  // Sector data with corresponding icons
  const sectors = [
    // Row 1 - 3 items
    [
      { name: "Climate Change", icon: CloudRain },
      { name: "Technology", icon: Laptop },
      { name: "Life science", icon: Microscope }
    ],
    // Row 2 - 4 items
    [
      { name: "Innovation", icon: Lightbulb },
      { name: "Finance", icon: DollarSign },
      { name: "Pharmacy", icon: Pill },
      { name: "Agriculture", icon: Wheat }
    ],
    // Row 3 - 3 items
    [
      { name: "Entrepreneurship", icon: Briefcase },
      { name: "Veterinary", icon: Heart },
      { name: "Medicine", icon: Stethoscope }
    ],
    // Row 4 - 2 items
    [
      { name: "Allied health science", icon: Shield },
      { name: "Environmental Science", icon: Leaf }
    ]
  ];

  const SectorCard = ({ name, icon: Icon }) => (
    <div className="bg-blue-200 rounded-2xl p-3 flex items-center space-x-3 transition-all duration-300 hover:bg-blue-400 group cursor-pointer min-h-[60px]">
      <div className="transition-all duration-300 flex-shrink-0">
        <div className="group-hover:hidden">
          <FourCornerStar />
        </div>
        <div className="hidden group-hover:block">
          <Icon size={38} className="text-blue-800" />
        </div>
      </div>
      <span className="text-gray-800 font-medium text-sm sm:text-base group-hover:text-white transition-colors duration-300 flex-1">{name}</span>
    </div>
  );

  return (
    <section className="py-4 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-500 text-center md:text-left">Sectors we Focus</h2>
        <div className="max-w-6xl mx-auto">
          {/* Row 1 - 3 items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2">
            {sectors[0].map((sector, index) => (
              <SectorCard key={index} name={sector.name} icon={sector.icon} />
            ))}
          </div>
          
          {/* Row 2 - 4 items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
            {sectors[1].map((sector, index) => (
              <SectorCard key={index} name={sector.name} icon={sector.icon} />
            ))}
          </div>
          
          {/* Row 3 - 3 items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2">
            {sectors[2].map((sector, index) => (
              <SectorCard key={index} name={sector.name} icon={sector.icon} />
            ))}
          </div>
          
          {/* Row 4 - 2 items centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
            {sectors[3].map((sector, index) => (
              <SectorCard key={index} name={sector.name} icon={sector.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorsSection;
