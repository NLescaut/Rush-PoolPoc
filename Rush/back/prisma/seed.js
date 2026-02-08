const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");


 
  // Seed images (remplace par TES fichiers réellement dans /uploads)
  const images = [
    { url: "/imgD/ashtonkutcher.jpg", label: "P.DIDDY" },
    { url: "/imgD/beyonce.png", label: "P.DIDDY" },
    { url: "/imgD/cassie-ventura.png", label: "P.DIDDY" },
    { url: "/imgD/interpol.jpg", label: "INTERPOL" },
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
