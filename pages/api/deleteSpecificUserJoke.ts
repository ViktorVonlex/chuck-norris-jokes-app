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
        const info = JSON.parse(req.body)
        const userJokes = await prisma.user.update({
            where: {
                email: info.email
            },
            data: {
                jokes: {
                    disconnect: [{url: info.url}]
                }
            },
            select: {
                jokes: true
            }
        });
      if(userJokes!==null) {
        res.status(200).json(userJokes?.jokes);
      } else {
        res.status(404).json({message: "No saved jokes for this user yet"})
      }
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  }
};export default handler