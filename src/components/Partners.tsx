import Marquee from "react-fast-marquee";

const partnerImages = [
  "https://emqjnmygnvlegyzkopmr.supabase.co/storage/v1/object/public/s4s-media/partners/B%20aatral%20logo%20(1).png",
  "https://emqjnmygnvlegyzkopmr.supabase.co/storage/v1/object/public/s4s-media/partners/BBC-Logo-trans-800x322.png",
  "https://emqjnmygnvlegyzkopmr.supabase.co/storage/v1/object/public/s4s-media/partners/finalised%20logo%20shewell%20(1).png",
  "https://emqjnmygnvlegyzkopmr.supabase.co/storage/v1/object/public/s4s-media/partners/GeneAura%20Logo_PNG.png",
  "https://emqjnmygnvlegyzkopmr.supabase.co/storage/v1/object/public/s4s-media/partners/INOVAUGMET%20LATEST%20LOGO.jpeg",
  "https://emqjnmygnvlegyzkopmr.supabase.co/storage/v1/object/public/s4s-media/partners/SRIIC%20LOGO%20BIRAC%205%20(1)%20(1).png",
  "https://emqjnmygnvlegyzkopmr.supabase.co/storage/v1/object/public/s4s-media/partners/XERA%20robatics.jpeg",
  "https://emqjnmygnvlegyzkopmr.supabase.co/storage/v1/object/public/s4s-media/partners/imrobonix.jpeg",
];

function Partners() {
  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <h1 className="font-semibold text-3xl mb-5">
        Industrial & Academic Partners
      </h1>
      <div className="w-full md:w-2/3 flex flex-col gap-14">
        <Marquee
          speed={30}
          gradient={true}
          pauseOnHover={true}
          loop={0}
          autoFill={true}
          gradientWidth={20}
          className=" rounded-md pt-5 pb-5 overflow-hidden"
        >
          {partnerImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Partner ${index + 1}`}
              className="h-9 sm:h-10 md:h-24 mx-4"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Partners;
