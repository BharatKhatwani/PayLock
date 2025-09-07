// import type { NextApiRequest, NextApiResponse } from 'next'
// import { PrismaClient } from '@repo/db/client'

// const prisma = new PrismaClient()

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     const users = await prisma.user.findMany()
//     return res.status(200).json(users)
//   }
//   res.status(405).end()
// }
