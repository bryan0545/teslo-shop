import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utilities';

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        email: string;
        role: string;
        name: string;
      };
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return checkToken(req, res);

    default:
      res.status(400).json({
        message: 'Bad request',
      });
  }
}
const checkToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies;
  let userId = '';

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    res.status(401).json({
      message: 'Token de autorizacion no vlaido',
    });
  }

  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(400).json({
      message: 'No existe usuario asociado a al ID',
    });
  }

  const { email, _id, role, name } = user;

  return res.status(200).json({
    token: jwt.singToken(_id, email),
    user: {
      email,
      role,
      name,
    },
  });
};
