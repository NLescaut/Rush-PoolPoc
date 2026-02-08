require("dotenv").config()
const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");


 
  // Seed images (remplace par TES fichiers réellement dans /uploads)
  const images = [
    { url: "/imgD/ashtonkutcher.jpg", label: "P_DIDDY" },
    { url: "/imgD/beyonce.jpg", label: "P_DIDDY" },
    { url: "/imgD/cassie-ventura.jpg", label: "P_DIDDY" },
    { url: "/imgD/christian-combs.jpg", label: "P_DIDDY" },
    { url: "/imgD/cubagoodingjr.jpg", label: "P_DIDDY" },
    { url: "/imgD/dicaprio.jpg", label: "P_DIDDY" },
    { url: "/imgD/jayz.jpg", label: "P_DIDDY" },
    { url: "/imgD/jennifer-lopez.jpg", label: "P_DIDDY" },
    { url: "/imgD/justin-combs.jpg", label: "P_DIDDY" },
    { url: "/imgD/justinbieber.jpg", label: "P_DIDDY" },
    { url: "/imgD/Katt-Williams.jpg", label: "P_DIDDY" },
    { url: "/imgD/kimk.jpg", label: "P_DIDDY" },
    { url: "/imgD/licensed-image.jpg", label: "P_DIDDY" },
    { url: "/imgD/odellbeckhamjr.jpg", label: "P_DIDDY" },
    { url: "/imgD/usher.jpg", label: "P_DIDDY" },
    { url: "/imgD/yungmiami.jpg", label: "P_DIDDY" },
    { url: "/imgD/mila-kunis.jpg", label: "P_DIDDY" },
    { url: "/imgD/paris-hilton.jpg", label: "P_DIDDY" },
    { url: "/imgE/bill-clinton.jpg", label: "EPSTEIN" },
    { url: "/imgE/billgates.jpg", label: "EPSTEIN" },
    { url: "/imgE/davidcopperfield.jpg", label: "EPSTEIN" },
    { url: "/imgE/donald-trump.jpg", label: "EPSTEIN" },
    { url: "/imgE/ghislain-maxwell.jpg", label: "EPSTEIN" },
    { url: "/imgE/jacklang.jpg", label: "EPSTEIN" },
    { url: "/imgE/MJ.jpg", label: "EPSTEIN" },
    { url: "/imgE/jlbrunel.jpg", label: "EPSTEIN" },
    { url: "/imgE/oliviercolom.jpg", label: "EPSTEIN" },
    { url: "/imgE/petermandelson.jpg", label: "EPSTEIN" },
    { url: "/imgE/princeandrew.jpg", label: "EPSTEIN" },
    { url: "/imgE/stephenhawking.jpg", label: "EPSTEIN" },
  ];

  for (const img of images) {
    await prisma.imageCard.upsert({
      where: { url: img.url },
      update: { label: img.label },
      create: img,
    });
  }

  console.log(`✅ Seeded ${images.length} images + 1 user`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
