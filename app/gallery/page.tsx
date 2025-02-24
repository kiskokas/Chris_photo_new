import fs from "fs";
import path from "path";
import { getPlaiceholder } from "plaiceholder";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const imagesDir = path.join(process.cwd(), "public/images");

async function getImages() {
  const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const imageFiles = fs
    .readdirSync(imagesDir)
    .filter((file) => validExtensions.includes(path.extname(file).toLowerCase()))
    .map((file) => `/images/${file}`);

  const images = await Promise.all(
    imageFiles.map(async (src) => {
      try {
        const filePath = path.join(imagesDir, src.replace("/images/", ""));
        const buffer = fs.readFileSync(filePath);
        const { base64 } = await getPlaiceholder(buffer);
        return { src, blurDataURL: base64 };
      } catch (error) {
        console.error(`Error processing image ${src}:`, error);
        return { src, blurDataURL: "" };
      }
    })
  );

  return images;
}

export default async function GalleryPage() {
  const images = await getImages();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <Gallery images={images} />
      <Footer />
      <ScrollToTop />
    </div>
  );
}