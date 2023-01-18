/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const info = JSON.parse(req.body)
    const savedJoke = await prisma.joke.create({
        data: {
          url: info.jokeUrl,
          users: {
            connect: {
              email: info.userMail
            }
          }
        },
    });
    res.status(200).json({ message: 'Succes save' });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};