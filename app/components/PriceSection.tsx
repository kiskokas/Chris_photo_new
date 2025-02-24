"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PriceSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const packages = [
    {
      name: "Mini csomag",
      price: "20.900 Ft",
      duration: "0,5-1 óra fotózás",
      images: "10 db kidolgozott kép átadása digitális formában",
    },
    {
      name: "Normál csomag",
      price: "34.900 Ft",
      duration: "1-1,5 óra fotózás",
      images: "25 db kidolgozott kép átadása digitális formában",
      popular: true,
    },
    {
      name: "Prémium csomag",
      price: "44.900 Ft",
      duration: "1,5-2 óra fotózás",
      images: "35 db kidolgozott kép átadása digitális formában",
    },
  ];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 bg-gray-100"
      id="prices"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Árak</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg relative"
            >
              {pkg.popular && (
                <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                  NÉPSZERŰ
                </span>
              )}
              <h3 className="text-xl font-semibold mb-4">{pkg.name}</h3>
              <p className="text-2xl font-bold mb-2">{pkg.price}</p>
              <p className="text-gray-700">✅ {pkg.duration}</p>
              <p className="text-gray-700">✅ {pkg.images}</p>
              <button
                className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all hover:bg-green-700 hover:shadow-lg"
                onClick={scrollToContact}
              >
                EZT VÁLASZTOM!
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-left max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Általános információk:</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Stúdióban történő fotózásra Szombathelyen van lehetőség, esetben a stúdió bérleti díja a csomagáron felül fizetendő (11.000-13.000 Ft).</li>
            <li>Az elkészült nyers képek közül Te választhatod ki a kedvenceidet, amiket utómunkázok, retusálok.</li>
            <li>A képek átadása digitális formában, Google Drive linken keresztül történik.</li>
            <li>A képek átadására a fotózástól számítva kb. 2-3 héttel később számíthatsz.</li>
            <li>Ajándékutalvány vásárolható akár fix összegben, akár konkrét fotózásra.</li>
            <li>Szombathelyen kívüli fotózás esetében az útiköltség térítése Téged terhel. (75 Ft/km Szombathely belvárosától)</li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default PriceSection;
