"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PriceSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const packages = [
    {
      name: "Mini csomag",
      price: "24.900 Ft",
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
      className="py-16 bg-slate-50 dark:bg-header-light_dark"
      id="prices"
    >
      <div className="container mx-auto text-center px-3">
        <h2 className="text-3xl font-bold mb-8 text-header-black">Árak</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className="bg-white/30 dark:bg-header-dark backdrop-blur-md p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg relative" // Added glassmorphism classes
              whileHover={{ scale: 1.1 }} // Added scale on hover
            >
              {pkg.popular && (
                <span className="absolute top-0 right-0 bg-header-dark dark:bg-header-light text-header-light dark:text-header-dark text-xs font-bold px-2 py-1 rounded-bl-lg">
                  NÉPSZERŰ
                </span>
              )}
              <h3 className="text-xl font-semibold mb-4 text-black">{pkg.name}</h3>
              <p className="text-2xl font-bold mb-2 text-black">{pkg.price}</p>
              <p className="text-slate-700"> {pkg.duration}</p>
              <p className="text-slate-700"> {pkg.images}</p>
              <button
                className="mt-4 bg-header-dark dark:bg-header-light text-header-light dark:text-header-dark font-bold py-2 px-4 rounded-lg transition-all hover:bg-slate-700 hover:shadow-lg"
                onClick={scrollToContact}
              >
                EZT VÁLASZTOM!
              </button>
            </motion.div>
          ))}
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0 text-left max-w-3xl mx-auto px-5">
          <h3 className="text-2xl font-bold mb-4 mt-4 text-black">Általános információk:</h3>
          <ul className="list-disc list-inside text-slate-700">
            <li>Stúdióban történő fotózásra Szombathelyen van lehetőség, ez esetben a stúdió bérleti díja a csomagáron felül fizetendő (11.000-13.000 Ft).</li>
            <li>Az elkészült nyers képek közül Te választhatod ki a kedvenceidet, amiket utómunkázok, retusálok.</li>
            <li>A képek átadása digitális formában, Google Drive linken keresztül történik.</li>
            <li>A képek átadására a fotózástól számítva 1 héttel később számíthatsz.</li>
            <li>Ajándékutalvány vásárolható akár fix összegben, akár konkrét fotózásra.</li>
            <li>Szombathelyen kívüli fotózás esetében az útiköltség térítése Téged terhel. (75 Ft/km Szombathely belvárosától)</li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default PriceSection;