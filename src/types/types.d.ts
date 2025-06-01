import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
  }

  interface Account {}

  interface Session {
    token: JWT;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
}
