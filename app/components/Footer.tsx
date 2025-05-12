import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-header-light dark:bg-header-dark text-gray-700 text-center p-4 flex justify-center items-center gap-4">
      <span>© 2025 Nagy Krisztian</span>
      <a href="https://www.instagram.com/krisztian_photoart" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-gray-700 text-xl hover:text-gray-900" />
      </a>
      <a href="https://www.facebook.com/share/1GDLzfESGM/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="text-gray-700 text-xl hover:text-gray-900" />
      </a>
    </footer>
  );
};

export default Footer;