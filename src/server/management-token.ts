import jwt, { type Secret } from 'jsonwebtoken';
import { env } from '~/env.mjs';
import uuid4 from 'uuid4';

interface Payload {
  iat: number;
  nbf: number;
  access_key: string;
  type: string;
  version: number;
}
  
const payload : Payload= {
  access_key: env.ACCESS_KEY,
  type: 'management',
  version: 2,
  iat: Math.floor(Date.now() / 1000),
  nbf: Math.floor(Date.now() / 1000)
};

export const generateManagementToken = (): Promise<string> => {

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, 
      env.APP_SECRET as Secret,
      {
        algorithm: 'HS256',
        expiresIn: '24h',
        jwtid: uuid4()
      },
      function (err, token) {
        if (err) {
          reject(err);
        } else {
          resolve(token as string);
        }
      }
    );
  });
};
