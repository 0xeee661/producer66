This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## ⚠️ Clerk Webhook Configuration (IMPORTANT)

**If users are not being saved to the database**, it's because the Clerk webhook is not configured. Follow these steps:

### Quick Diagnosis

Run the diagnostic script:
```bash
./diagnose.sh
```

### Full Configuration Guide

See **[WEBHOOK_DEBUGGING.md](./WEBHOOK_DEBUGGING.md)** for complete instructions.

### Quick Setup (Production)

1. Deploy your app to Vercel
2. Go to [Clerk Dashboard](https://dashboard.clerk.com/) → Webhooks
3. Add endpoint: `https://your-domain.vercel.app/api/webhooks/clerk`
4. Select events: `user.created`, `user.updated`
5. Copy the webhook secret to your Vercel environment variables as `CLERK_WEBHOOK_SECRET`

### Quick Setup (Development)

1. Install ngrok: `brew install ngrok`
2. Run: `npm run dev` (in one terminal)
3. Run: `ngrok http 3000` (in another terminal)
4. Copy the ngrok URL (e.g., `https://xxxx.ngrok-free.app`)
5. Go to [Clerk Dashboard](https://dashboard.clerk.com/) → Webhooks
6. Add endpoint: `https://xxxx.ngrok-free.app/api/webhooks/clerk`
7. Select events: `user.created`, `user.updated`
8. Copy the webhook secret to `.env.local` as `CLERK_WEBHOOK_SECRET`
9. Restart your dev server

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

