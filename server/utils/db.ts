import {PrismaMariaDb} from '@prisma/adapter-mariadb'
import {PrismaClient} from "~/generated/prisma/client";
import consola from "consola";

const prismaClientSingleton = () => {
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
        consola.error("Missing database url");
        throw new Error("Missing database url")
    }

    // mysql://user:password@localhost:3306/database_name
    const user = databaseUrl.split('://')[1].split(':')[0]
    if (user === 'root') {
        consola.warn('Warning: You are using the root user for the database connection. ')
        consola.warn('It is recommended to use a dedicated database user with limited privileges for better security.')
    }

    const host = databaseUrl.split('@')[1].split(':')[0]
    const username = databaseUrl.split('://')[1].split('@')[0]
    const password = username.split(':')[1]
    if (!password || password.length < 8) {
        consola.warn('Warning: Your database password is either missing or too short. ')
        consola.warn('For security reasons, it is recommended to use a strong password with at least 8 characters.')
    }
    const port = databaseUrl.split(':')[2].split('/')[0]
    const database = databaseUrl.split('/')[3]

    const pool = new PrismaMariaDb({
        host: host,
        port: Number(port),
        user: user,
        password: password,
        database: database,
        connectionLimit: 5,
    })
    return new PrismaClient({adapter: pool})
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
