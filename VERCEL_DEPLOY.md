# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Step 1: Add Environment Variables in Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project: **MiniCode-Copilot**
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:

```
Name: VITE_GROK_API_KEY
Value: your_grok_api_key_here
```

**Important:** Make sure to add it for **Production**, **Preview**, and **Development** environments.

### Step 2: Redeploy

After adding the environment variable:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** button

OR just push a new commit to trigger automatic deployment.

### Step 3: Verify Deployment

Once deployed, open your Vercel app URL and:
1. Press `F12` to open console
2. Look for: `=== API Configuration Debug ===`
3. Verify: `GROK_API_KEY: gsk_xxxxxxxx...` (not "NOT SET")

---

## 🔧 Project Structure for Vercel

Your project is configured to deploy from: `frontend/mycopilot/`

The `vercel.json` file tells Vercel:
- Build command: `cd frontend/mycopilot && npm install && npm run build`
- Output directory: `frontend/mycopilot/dist`
- Framework: Vite

---

## ⚠️ Common Issues

### Issue: "VITE_GROK_API_KEY is NOT SET"
**Solution:** Add the environment variable in Vercel dashboard (Settings → Environment Variables)

### Issue: Build fails
**Solution:** Make sure all dependencies are in `frontend/mycopilot/package.json`

### Issue: 404 errors on routes
**Solution:** Already handled by `vercel.json` rewrites configuration

---

## ✅ Checklist

- [ ] Environment variable `VITE_GROK_API_KEY` added in Vercel
- [ ] Variable added for Production, Preview, and Development
- [ ] Redeployed after adding environment variable
- [ ] Verified API key is detected in browser console

---

**Your Vercel project is now configured correctly!** Just add the environment variable and redeploy.
