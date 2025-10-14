# Deployment Guide

This guide covers different deployment options for the 0day.sigma Archive application.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

**Easiest and fastest deployment option**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. **Configure (Optional)**
   - Custom domain
   - Environment variables
   - Build settings

**Advantages:**
- Zero configuration
- Automatic deployments
- Global CDN
- Serverless functions
- Free tier available

### Option 2: Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git"
   - Select your repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

**Advantages:**
- Easy setup
- Form handling
- Edge functions
- Free tier available

### Option 3: GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "GitHub Actions"

2. **Workflow will auto-deploy**
   - Push to main branch
   - GitHub Actions will build and deploy
   - Available at `https://username.github.io/repo-name`

**Advantages:**
- Free hosting
- Integrated with GitHub
- Custom domains supported

## 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t 0day-archive .

# Run container
docker run -p 3000:3000 0day-archive
```

## ☁️ Cloud Platform Deployment

### AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Click "New app" > "Host web app"
   - Connect GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Base directory: `/`
   - Build output: `.next`

3. **Deploy**
   - Review settings and deploy

### Google Cloud Run

1. **Create Dockerfile** (see above)
2. **Build and push image**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT-ID/0day-archive
   ```
3. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy --image gcr.io/PROJECT-ID/0day-archive --platform managed
   ```

### Azure Static Web Apps

1. **Install Azure CLI**
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. **Deploy**
   ```bash
   swa deploy --app-id <app-id> --env production
   ```

## 🔧 Environment Configuration

### Environment Variables

Create `.env.local` for local development:

```env
# Optional: Custom API base URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Custom domain
NEXT_PUBLIC_DOMAIN=your-domain.com
```

### Production Environment

Set these in your deployment platform:

- `NODE_ENV=production`
- `NEXT_PUBLIC_API_URL=https://your-domain.com/api`

## 📊 Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npm run analyze

# Optimize images
npm install @next/bundle-analyzer
```

### Caching Strategy

- Static assets: Long-term caching
- API responses: Short-term caching
- Data files: Version-based caching

### CDN Configuration

- Enable gzip compression
- Set appropriate cache headers
- Use HTTP/2
- Enable Brotli compression

## 🔒 Security Considerations

### Headers

Add security headers in `next.config.js`:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]
```

### HTTPS

- Always use HTTPS in production
- Redirect HTTP to HTTPS
- Use HSTS headers

## 📈 Monitoring

### Analytics

- Google Analytics
- Vercel Analytics
- Custom metrics

### Error Tracking

- Sentry
- LogRocket
- Custom error handling

### Performance Monitoring

- Web Vitals
- Core Web Vitals
- Custom performance metrics

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Runtime Errors**
   - Check environment variables
   - Verify API routes
   - Check browser console

3. **Performance Issues**
   - Optimize images
   - Enable compression
   - Check bundle size

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Check build output
npm run build && npm run start
```

## 📞 Support

If you encounter deployment issues:

1. Check the [Issues](https://github.com/your-username/0day-archive-app/issues) page
2. Create a new issue with deployment details
3. Include error logs and configuration

---

**Need help?** Open an issue or contact the maintainers!
