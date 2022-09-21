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
    case 'POST':
      return registerUser(req, res);

    default:
      res.status(400).json({
        message: 'Bad request',
      });
  }
}
const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', name = '' } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe ser mayor a 6 caracteres' });
  }

  if (name.length < 2) {
    return res.status(400).json({ message: 'El nombre debe ser mayor a 2 caracteres' });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: 'El formato del correo no es valido' });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    return res.status(500).json({ message: 'Revisar logs del servidor' });
  }

  const { role, _id } = newUser;
  const token = jwt.singToken(_id, email);
  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  });
};
