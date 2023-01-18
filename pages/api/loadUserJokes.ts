/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import { Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const userJokes = await prisma.user.findMany({
        where: {
            email: req.body
        },
        select: {
          savedJokes: true
        }
    });
    console.log(userJokes)
    res.status(200).json(userJokes);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};