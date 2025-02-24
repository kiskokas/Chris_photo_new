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
    .filter((file) => validExtensions.includes(path.extname(file).toLowerCase()));

  type CategoryName = "Portrait" | "Family" | "Child" | "Nature";

  const categorizedImages: Record<CategoryName, { src: string; blurDataURL: string }[]> = {
    Portrait: [],
    Family: [],
    Child: [],
    Nature: [],
  };

  for (const file of imageFiles) {
    const category = getCategoryFromFilename(file) as CategoryName; // Ensure the type matches
    const src = `/images/${file}`;
    const filePath = path.join(imagesDir, file);
    const buffer = fs.readFileSync(filePath);
    const { base64 } = await getPlaiceholder(buffer);
    
    categorizedImages[category].push({ src, blurDataURL: base64 });
  }

  return Object.entries(categorizedImages).map(([name, images]) => ({
    name,
    images
  }));
}

function getCategoryFromFilename(filename: string): string {
  if (filename.startsWith("portrait")) return "Portrait";
  if (filename.startsWith("family")) return "Family";
  if (filename.startsWith("child")) return "Child";
  if (filename.startsWith("nature")) return "Nature";
  return "Portrait"; // Default category if none matched
}

export default async function GalleryPage() {
  const categories = await getImages();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <Gallery categories={categories} />
      <Footer />
      <ScrollToTop />
    </div>
  );
}