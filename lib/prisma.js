import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = global;
// Minimal diagnostics: capture process info and PRISMA envs without requiring modules
let prismaClient
try {
    prismaClient = globalForPrisma.prisma || new PrismaClient({ log: ['query'] })
} catch (err) {
    const diag = {
        message: err.message,
        stack: err.stack,
        cwd: process.cwd(),
        node: process.version,
        prismaEnv: Object.keys(process.env).filter(k=>k.startsWith('PRISMA')||k==='DATABASE_URL').reduce((o,k)=>{o[k]=process.env[k];return o},{})
    }
    err.prismaDiagnostic = diag
    // also print to console for scripts
    try { console.error('Prisma initialization error diagnostics:', JSON.stringify(diag, null, 2)) } catch(e){}
    throw err
}

export const prisma = prismaClient

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;