const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");


 
  // Seed images (remplace par TES fichiers réellement dans /uploads)
  const images = [
    { url: "/imgD/ashtonkutcher.jpg", label: "P.DIDDY" },
    { url: "/imgD/beyonce.jpg", label: "P.DIDDY" },
    { url: "/imgD/cassie-ventura.jpg", label: "P.DIDDY" },
    { url: "/imgD/christian-combs.jpg", label: "P.DIDDY" },
    { url: "/imgD/cubagoodingjr.jpg", label: "P.DIDDY" },
    { url: "/imgD/dicaprio.jpg", label: "P.DIDDY" },
    { url: "/imgD/jayz.jpg", label: "P.DIDDY" },
    { url: "/imgD/jennifer-lopez.jpg", label: "P.DIDDY" },
    { url: "/imgD/justin-combs.jpg", label: "P.DIDDY" },
    { url: "/imgD/justinbieber.jpg", label: "P.DIDDY" },
    { url: "/imgD/Katt-Williams.jpg", label: "P.DIDDY" },
    { url: "/imgD/kimk.jpg", label: "P.DIDDY" },
    { url: "/imgD/licensed-image.jpg", label: "P.DIDDY" },
    { url: "/imgD/odellbeckhamjr.jpg", label: "P.DIDDY" },
    { url: "/imgD/usher.jpg", label: "P.DIDDY" },
    { url: "/imgD/yungmiami.jpg", label: "P.DIDDY" },
    { url: "/imgD/mila-kunis.jpg", label: "P.DIDDY" },
    { url: "/imgD/paris-hilton.jpg", label: "P.DIDDY" },
    { url: "/imgD/interpol.jpg", label: "INTERPOL" },
    { url: "/imgD/byonce.png", label: "P.DIDDY" },
    { url: "/imgE/billclinton.jpg", label: "EPSTEIN" },
    { url: "/imgE/billgates.jpg", label: "EPSTEIN" },
    { url: "/imgE/davidcopperfieldjpg", label: "EPSTEIN" },
    { url: "/imgE/donaldtrump.jpg", label: "EPSTEIN" },
    { url: "/imgE/ghislainmaxwell.jpg", label: "EPSTEIN" },
    { url: "/imgE/jacklang.jpg", label: "EPSTEIN" },
    { url: "/imgE/MJ.jpg", label: "EPSTEIN" },
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
