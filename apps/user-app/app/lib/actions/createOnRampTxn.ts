'use server';

import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

export async function createOnRamptxn(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || '';
  const token = Math.random().toString().substring(2, 7);

  if (!userId) {
    return {
      message: 'User not logged in',
    };
  }

  try {
    // Create a single transaction record
    await prisma.onRampTransaction.create({
      data: {
        userId: Number(userId),
        amount,
        provider,
        status: 'Processing',
        token,
        startTime: new Date(),
      },
    });

    return {
      message: 'Transaction created and balance Pending',
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'Error while processing transaction',
    };
  }
}
