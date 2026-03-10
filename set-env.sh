#!/bin/bash

# Set environment variables for production
vercel env add MONGODB_URI production < /dev/null
vercel env add NEXTAUTH_URL production < /dev/null
vercel env add NEXTAUTH_SECRET production < /dev/null
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production < /dev/null
vercel env add STRIPE_SECRET_KEY production < /dev/null

echo "Environment variables configured"
