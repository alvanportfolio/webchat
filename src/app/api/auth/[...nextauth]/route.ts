import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

// Instantiate Prisma Client
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url, provider, theme }) {
        const { host } = new URL(url);
        // Dynamically import nodemailer for sending email
        const nodemailer = await import('nodemailer');
        const transport = nodemailer.createTransport(provider.server);
        const result = await transport.sendMail({
          to: email,
          from: provider.from,
          subject: `Sign in to Alvan World`,
          text: text({ url, host }),
          html: html({ url, host, theme }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
    // Add other providers here if needed (e.g., Google, GitHub)
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // Using JWT for session strategy
  },
  pages: {
    signIn: '/', // Redirect to home page for sign-in, where a modal can be triggered
    verifyRequest: '/auth/verify-request', // Page to show after user requests a magic link
    // error: '/auth/error', // Error page (optional)
    // newUser: '/auth/new-user' // New user page (optional)
  },
  callbacks: {
    async session({ session, token }) {
      // Add user ID and email to the session object
      if (token && session.user) {
        session.user.id = token.sub as string; // `sub` is the user id from the JWT
        // session.user.email = token.email; // Email is already part of the default session user type
      }
      return session;
    },
    async jwt({ token, user }) {
      // Persist the user's ID into the JWT right after signin
      if (user) {
        token.sub = user.id;
        // token.email = user.email; // Email is already part of the default token
      }
      return token;
    },
  },
  // Enable debug messages in the console if not in production
  debug: process.env.NODE_ENV !== 'production',
};

// Email HTML body
function html({ url, host, theme }: { url: string; host: string; theme: any }) {
  const escapedHost = host.replace(/\./g, "&#8203;.");

  // Modern dark theme colors
  const brandColor = theme?.brandColor || "#6d28d9"; // Purple brand color
  const accentColor = "#8b5cf6"; // Lighter purple for accents
  const buttonTextColor = "#ffffff";
  const backgroundColor = "#111827"; // Dark background
  const textColor = "#e5e7eb"; // Light text for dark background
  const secondaryTextColor = "#9ca3af"; // Lighter gray for secondary text
  const cardBackgroundColor = "#1f2937"; // Slightly lighter than the background
  const borderColor = "#374151"; // Dark border color
  const footerBackgroundColor = "#161e2e"; // Even darker for the footer
  
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in to Alvan World</title>
</head>
<body style="background: ${backgroundColor}; margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: ${textColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background: ${cardBackgroundColor}; border: 1px solid ${borderColor}; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.25); max-width: 90%;">
          <!-- Header with gradient background -->
          <tr>
            <td align="center" style="padding: 35px 30px; background: linear-gradient(to right, #4c1d95, #6d28d9); border-top-left-radius: 12px; border-top-right-radius: 12px;">
              <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                <span style="display: inline-block; padding-right: 12px; vertical-align: middle;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style="vertical-align: middle;">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#f3f4f6" />
                    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#f3f4f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <strong>Alvan World</strong>
              </h1>
            </td>
          </tr>
          
          <!-- Main content -->
          <tr>
            <td align="center" style="padding: 40px 30px;">
              <h2 style="color: ${textColor}; margin-top: 0; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Sign in to your account</h2>
              <p style="color: ${secondaryTextColor}; font-size: 16px; line-height: 1.6; margin-bottom: 30px; max-width: 450px; text-align: center;">
                Welcome back! Click the button below to securely sign in to your account on ${escapedHost}.
              </p>
              <div style="margin: 35px 0;">
                <a href="${url}" target="_blank" style="background: linear-gradient(to right, ${brandColor}, ${accentColor}); color: ${buttonTextColor}; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">Sign In</a>
              </div>
              <p style="color: ${secondaryTextColor}; font-size: 14px; line-height: 1.6; margin-top: 25px; max-width: 450px; text-align: center;">
                If you didn't request this email, you can safely ignore it.
              </p>
              <p style="color: ${secondaryTextColor}; font-size: 13px; margin-top: 20px; font-style: italic;">
                This link will expire in 24 hours.
              </p>
            </td>
          </tr>
          
          <!-- Security notice -->
          <tr>
            <td align="center" style="padding: 0 30px 30px;">
              <table width="100%" style="border-top: 1px solid ${borderColor}; padding-top: 20px;">
                <tr>
                  <td align="center">
                    <p style="color: ${secondaryTextColor}; font-size: 13px; line-height: 1.5; margin: 0 0 8px;">
                      <span style="display: inline-block; vertical-align: middle; margin-right: 6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${secondaryTextColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </span>
                      For your security, never forward this email to anyone.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px; background-color: ${footerBackgroundColor}; border-top: 1px solid ${borderColor}; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
              <p style="color: ${secondaryTextColor}; font-size: 12px; margin: 0;">
                &copy; ${currentYear} <strong>Alvan World</strong>. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Email Text body (fallback)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to Alvan World\n${url}\n\nThis link will expire in 24 hours.\nIf you did not request this, please ignore this email.\n`;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };