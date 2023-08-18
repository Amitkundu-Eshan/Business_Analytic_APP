import jwt from 'jsonwebtoken';

export const generateToken = (id, time = '30d') => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: time,
  });
};
