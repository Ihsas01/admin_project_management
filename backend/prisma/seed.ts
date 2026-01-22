import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create ADMIN user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await hashPassword('password123'),
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log('Created admin user:', adminUser);

  // Create sample MANAGER user
  const managerUser = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      name: 'Manager User',
      email: 'manager@example.com',
      password: await hashPassword('password123'),
      role: 'MANAGER',
      status: 'ACTIVE',
    },
  });

  console.log('Created manager user:', managerUser);

  // Create sample STAFF user
  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@example.com' },
    update: {},
    create: {
      name: 'Staff User',
      email: 'staff@example.com',
      password: await hashPassword('password123'),
      role: 'STAFF',
      status: 'ACTIVE',
    },
  });

  console.log('Created staff user:', staffUser);

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Complete redesign of company website',
      status: 'ACTIVE',
      createdById: adminUser.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Mobile App Development',
      description: 'Development of iOS and Android mobile app',
      status: 'ACTIVE',
      createdById: managerUser.id,
    },
  });

  const project3 = await prisma.project.create({
    data: {
      name: 'Marketing Campaign',
      description: 'Q1 marketing campaign for new product',
      status: 'ARCHIVED',
      createdById: staffUser.id,
    },
  });

  console.log('Created sample projects:', { project1, project2, project3 });

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });