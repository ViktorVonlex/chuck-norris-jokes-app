/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';

import { Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log("top of try catch createUser")
    const user: Prisma.UserCreateInput = JSON.parse(req.body);
    console.log("parsing req body")
    console.log(user)
    const savedUser = await prisma.user.create({ data: user });
    console.log("after getting savedUser")
    console.log(savedUser)
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};