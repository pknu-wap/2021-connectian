export const jwtConstants = {
  secret: process.env['SESSION_SECRET'],
};

export class Payload {
  pub: string;
  username: string;
}
