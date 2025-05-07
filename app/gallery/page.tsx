import fs from "fs";
import path from "path";
import { getPlaiceholder } from "plaiceholder";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { SpeedInsights } from '@vercel/speed-insights/next';

const imagesDir = path.join(process.cwd(), "public/images");

async function getImages() {
  const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const imageFiles = fs
    .readdirSync(imagesDir)
    .filter((file) => validExtensions.includes(path.extname(file).toLowerCase()));

  type CategoryName = "Portré" | "Családi" | "Szezonális" | "Természet" | "Uncategorized";

  const categorizedImages: Record<CategoryName, { src: string; blurDataURL: string }[]> = {
    Portré: [],
    Családi: [],
    Szezonális: [],
    Természet: [],
    Uncategorized: []
  };

  for (const file of imageFiles) {
    const category = getCategoryFromFilename(file) as CategoryName;
    const src = `/images/${file}`;
    const filePath = path.join(imagesDir, file);
    const buffer = fs.readFileSync(filePath);
    const { base64 } = await getPlaiceholder(buffer);
    
    categorizedImages[category].push({ src, blurDataURL: base64 });
  }

  // Exclude "Uncategorized" from the results
  return Object.entries(categorizedImages)
    .filter(([name]) => name !== "Uncategorized")
    .map(([name, images]) => ({
      name,
      images
    }));
}

function getCategoryFromFilename(filename: string): string {
  if (filename.startsWith("portrait")) return "Portré";
  if (filename.startsWith("family")) return "Családi";
  if (filename.startsWith("season")) return "Szezonális";
  if (filename.startsWith("nature")) return "Természet";
  return "Uncategorized"; // Default category if none matched
}

export default async function GalleryPage() {
  const categories = await getImages();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-header-light_dark">
      <Header />
      <Gallery categories={categories} />
      <SpeedInsights />
      <Footer />
      <ScrollToTop />
    </div>
  );
}