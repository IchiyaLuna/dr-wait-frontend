import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid credentials';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter your username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      authorize: async (credentials) => {
        const backendUrl = process.env.BACKEND_URL;

        const res = await fetch(backendUrl + '/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        if (!res.ok) {
          throw new InvalidLoginError();
        }

        const token: {
          accessToken: string;
          refreshToken: string;
        } = await res.json();

        return token;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      console.log('Authorized callback:', auth);
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        // First time the JWT callback is called, user object is available
        const accessTokenPayload: {
          sub: string;
          role: string;
          iat: number;
          exp: number;
        } = JSON.parse(atob(user.accessToken.split('.')[1]));
        // Set the token properties
        return {
          ...token,
          id: accessTokenPayload.sub,
          access_token: user.accessToken,
          refresh_token: user.refreshToken,
          expires_at: accessTokenPayload.exp,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // If the token is still valid, return it as is
        return token;
      } else {
        console.log('Token expired, refreshing...', token.expires_at);
        if (!token.refresh_token) {
          // If no refresh token is available, throw an error
          throw new TypeError('Missing refresh_token');
        }
        const backendUrl = process.env.BACKEND_URL;
        try {
          const res = await fetch(backendUrl + '/api/auth/reissue', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refreshToken: token.refresh_token,
            }),
          });
          if (!res.ok) {
            throw new Error('Failed to refresh token');
          }
          const newToken: {
            accessToken: string;
            refreshToken: string;
          } = await res.json();
          const newAccessTokenPayload: {
            sub: string;
            role: string;
            iat: number;
            exp: number;
          } = JSON.parse(atob(newToken.accessToken.split('.')[1]));
          console.log('New access token payload:', newAccessTokenPayload);
          // Update the token with new access and refresh tokens
          return {
            ...token,
            id: newAccessTokenPayload.sub,
            access_token: newToken.accessToken,
            refresh_token: newToken.refreshToken,
            expires_at: newAccessTokenPayload.exp,
          };
        } catch (error) {
          console.error('Error refreshing token:', error);
          throw new Error('Failed to refresh token');
        }
      }
    },
    session({ session, token }) {
      session.token = token;
      return session;
    },
  },
});
