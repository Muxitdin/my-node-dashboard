// import { PrismaClient } from '@prisma/client';
//
// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined;
// };
//
// export const prisma = globalForPrisma.prisma ?? new PrismaClient();
//
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
//

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
    // чтобы избежать ошибок при hot reload в dev
    var prisma: PrismaClient | undefined;
}

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

export const prisma = global.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
