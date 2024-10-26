const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  for ( let i = 0; i < 100; i++ ) {
    await prisma.category.create({
      data: { name: faker.commerce.department() },
    });
  }
  console.log('Database filled!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
