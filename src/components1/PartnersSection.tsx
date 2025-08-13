
import { useEffect, useState } from "react";

const PartnersSection = () => {
  const partners = [
    { name: "Geneaura", logo: "/lovable-uploads/Geneaura.png" },
    { name: "Bangalore Bioinnovation Centre", logo: "/lovable-uploads/bioinnovation.png" },
    { name: "Shewell", logo: "/lovable-uploads/shewell.png" },
    { name: "IMrobonix", logo: "/lovable-uploads/IMrobonix.png" },
    { name: "Sri Ramachandra Innovation Incubation Centre", logo: "/lovable-uploads/Ramachandra.png" },
    { name: "B-Actrol Biosciences", logo: "/lovable-uploads/bioscience.png" },
    { name: "Xera Robotics", logo: "/lovable-uploads/XERA.png" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [partners.length]);

  // Create array with logos and stars
  type ItemWithStar =
    | { type: 'logo'; name: string; logo: string; key: string }
    | { type: 'star'; key: string };

  const createItemsWithStars = (): ItemWithStar[] => {
    const items: ItemWithStar[] = [];
    partners.forEach((partner, index) => {
      // Add logo
      items.push({ type: 'logo', ...partner, key: `logo-${index}` });
      // Add star after each logo (including the last one for seamless loop)
      items.push({ type: 'star', key: `star-${index}` });
    });
    return items;
  };

  const itemsWithStars = createItemsWithStars();

  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-20 md:mb-24 text-gray-800">Industrial & Academic Partners</h2>
        
        <div className="overflow-hidden">
          <div 
            className="flex items-center justify-center transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / partners.length)}%)` }}
          >
            {/* Duplicate the items for seamless scrolling */}
            {[...itemsWithStars, ...itemsWithStars].map((item, index) => (
              <div key={`${item.key}-${index}`} className="flex items-center justify-center flex-shrink-0" style={{ width: `${100 / partners.length}%` }}>
                {item.type === 'logo' ? (
                  <div className="flex items-center justify-center h-32 w-56 bg-white rounded-lg shadow-sm p-4 mx-2">
                    <img 
                      src={item.logo} 
                      alt={item.name}
                      className="max-h-28 max-w-52 object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center mx-6">
                    <svg width="32" height="32" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.0621 1.53451C22.3843 0.663891 23.6157 0.663888 23.9379 1.53451L29.3226 16.0866C29.4239 16.3603 29.6397 16.5761 29.9134 16.6774L44.4655 22.0621C45.3361 22.3843 45.3361 23.6157 44.4655 23.9379L29.9134 29.3226C29.6397 29.4239 29.4239 29.6397 29.3226 29.9134L23.9379 44.4655C23.6157 45.3361 22.3843 45.3361 22.0621 44.4655L16.6774 29.9134C16.5761 29.6397 16.3603 29.4239 16.0866 29.3226L1.53451 23.9379C0.663891 23.6157 0.663888 22.3843 1.53451 22.0621L16.0866 16.6774C16.3603 16.5761 16.5761 16.3603 16.6774 16.0866L22.0621 1.53451Z" fill="#00549F"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
