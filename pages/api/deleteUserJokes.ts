
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req})
  if(!session) {
    res.status(401).json({error: "Unauthenticated user"});
  } 
  else {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await prisma.user.update({
            where: {
                email: req.body
            },
            data: {
              jokes: {
                set: []
              }
            }
        });
        res.status(200).json({ message: 'Succes delete of userJokes' });
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }
};

export default handler