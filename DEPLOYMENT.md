# Deployment Guide ??

This guide covers multiple deployment options for the Polymarket Dashboard.

## Quick Deploy Options

### 1. Vercel (Easiest - Recommended)

**Steps:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

**Configuration:**
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Time to deploy:** ~2 minutes

---

### 2. Netlify

**Steps:**
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" ? "Import an existing project"
4. Connect to GitHub and select your repo
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**netlify.toml Configuration:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Time to deploy:** ~3 minutes

---

### 3. GitHub Pages

**Steps:**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/polymarket-dashboard",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/polymarket-dashboard/',
})
```

4. Deploy:
```bash
npm run deploy
```

**Time to deploy:** ~5 minutes

---

### 4. Cloudflare Pages

**Steps:**
1. Push code to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Click "Create a project"
4. Connect to GitHub
5. Configure:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click "Save and Deploy"

**Features:**
- Fast global CDN
- Unlimited bandwidth
- Free SSL
- Analytics included

**Time to deploy:** ~3 minutes

---

### 5. Railway

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Click "New Project" ? "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Vite
5. Click "Deploy"

**Time to deploy:** ~4 minutes

---

### 6. AWS S3 + CloudFront (Advanced)

**Prerequisites:**
- AWS Account
- AWS CLI configured

**Steps:**

1. Build the project:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://polymarket-dashboard
aws s3 website s3://polymarket-dashboard --index-document index.html
```

3. Upload files:
```bash
aws s3 sync dist/ s3://polymarket-dashboard --acl public-read
```

4. Set up CloudFront distribution:
   - Create distribution with S3 as origin
   - Configure custom domain (optional)
   - Enable HTTPS

**Time to deploy:** ~15-20 minutes

---

### 7. Docker + Any Cloud Provider

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Build and run:**
```bash
docker build -t polymarket-dashboard .
docker run -p 80:80 polymarket-dashboard
```

**Deploy to:**
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

---

## Environment Variables

If you need environment variables:

1. Create `.env.production`:
```env
VITE_API_BASE_URL=https://gamma-api.polymarket.com
VITE_CLOB_API_URL=https://clob.polymarket.com
```

2. Access in code:
```typescript
const API_URL = import.meta.env.VITE_API_BASE_URL;
```

3. Configure in your deployment platform:
   - Vercel: Settings ? Environment Variables
   - Netlify: Site settings ? Build & deploy ? Environment
   - Railway: Variables tab
   - GitHub Pages: Not supported (use build-time variables)

---

## Performance Optimization

### Before Deploying

1. **Optimize images:**
```bash
npm install --save-dev vite-plugin-imagemin
```

2. **Enable code splitting:**
Already configured in Vite by default

3. **Compress assets:**
Most platforms do this automatically

4. **Set cache headers:**
Configured in nginx.conf for Docker deployments

### After Deploying

1. **Test performance:**
   - [PageSpeed Insights](https://pagespeed.web.dev)
   - [GTmetrix](https://gtmetrix.com)

2. **Enable CDN:**
   - Most platforms include this
   - For AWS, use CloudFront

3. **Monitor:**
   - Set up analytics
   - Monitor API usage
   - Track error rates

---

## Custom Domain

### Vercel
1. Go to Project Settings ? Domains
2. Add your domain
3. Configure DNS records as shown

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Configure DNS or use Netlify DNS

### Cloudflare Pages
1. Go to Custom domains
2. Add domain
3. DNS configured automatically if using Cloudflare

---

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Troubleshooting

### Build Fails

**Error:** `Module not found`
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error:** `Out of memory`
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Blank Page After Deploy

1. Check browser console for errors
2. Verify base path in `vite.config.ts`
3. Check routing configuration
4. Verify assets are loading (Network tab)

### CORS Issues

If you encounter CORS errors:
1. APIs used are public and don't require CORS setup
2. If adding your own backend, configure CORS properly
3. Consider using a proxy for development

---

## Cost Estimates

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| Vercel | 100GB bandwidth | From $20/mo |
| Netlify | 100GB bandwidth | From $19/mo |
| GitHub Pages | Unlimited (public repos) | Free |
| Cloudflare Pages | Unlimited bandwidth | Free |
| Railway | $5 free credit | Pay as you go |
| AWS | 12 months free tier | Variable |

---

## Recommended Choice

**For this project, we recommend Vercel or Cloudflare Pages because:**
- ? Zero configuration
- ? Automatic HTTPS
- ? Global CDN
- ? Generous free tier
- ? Great performance
- ? Easy custom domains
- ? Automatic preview deployments

Deploy now and share your dashboard! ??
