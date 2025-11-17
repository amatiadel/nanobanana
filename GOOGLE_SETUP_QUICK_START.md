# Google Setup - Quick Start (5 Minutes)

## 🎯 Quick Setup Checklist

### 1. Google Analytics (2 minutes)

**Get your tracking ID:**
1. Go to https://analytics.google.com
2. Sign in with Google account
3. Click "Start measuring" or "Admin" (gear icon)
4. Create account → Name: "Banana Prompts"
5. Create property → Name: "Banana Prompts Website"
6. Choose "Web" platform
7. Enter website URL
8. **Copy the Measurement ID** (looks like: `G-ABC123XYZ`)

**Add to Vercel:**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add new variable:
   - Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: `G-ABC123XYZ` (your ID)
   - Check all environments (Production, Preview, Development)
5. Click "Save"
6. Redeploy your site

**Done!** Analytics will start tracking in 24-48 hours.

---

### 2. Google Search Console (3 minutes)

**Verify your site:**
1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Choose "URL prefix"
4. Enter: `https://yourdomain.com`
5. Choose "HTML tag" verification method
6. **Copy the verification code** (the part between `content="` and `"`)
   - Example: If you see `<meta name="google-site-verification" content="ABC123XYZ" />`
   - Copy only: `ABC123XYZ`

**Add to Vercel:**
1. Go to Vercel → Your project → Settings → Environment Variables
2. Add new variable:
   - Name: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - Value: `ABC123XYZ` (your code)
   - Check all environments
3. Click "Save"
4. Redeploy your site
5. Go back to Search Console and click "Verify"

**Submit sitemap:**
1. In Search Console, click "Sitemaps" (left sidebar)
2. Enter: `sitemap.xml`
3. Click "Submit"

**Done!** Google will start indexing your site.

---

## 🎉 That's It!

Your site is now:
- ✅ Tracking visitors with Google Analytics
- ✅ Indexed by Google Search
- ✅ Showing up in search results (within 1-2 weeks)

## 📊 Where to Check Results

**Google Analytics:**
- Dashboard: https://analytics.google.com
- Real-time: See visitors right now
- Reports: Traffic, pages, sources

**Google Search Console:**
- Dashboard: https://search.google.com/search-console
- Performance: Clicks, impressions, rankings
- Coverage: Indexed pages

## 🚀 Pro Tips

1. **Check Analytics daily** - See what's working
2. **Monitor Search Console weekly** - Fix any issues
3. **Create blog content** - More pages = more traffic
4. **Share on social media** - Drive initial traffic
5. **Be patient** - SEO takes 2-3 months to show results

## ❓ Troubleshooting

**Analytics not showing data?**
- Wait 24-48 hours
- Check if Measurement ID is correct
- Visit your site to generate test data

**Search Console verification failed?**
- Make sure you redeployed after adding the variable
- Check the verification code is correct
- Try again in 5 minutes

**Sitemap not found?**
- Visit: `https://yourdomain.com/sitemap.xml`
- Should show XML with your URLs
- If 404, redeploy your site

## 📞 Need Help?

- Google Analytics: https://support.google.com/analytics
- Search Console: https://support.google.com/webmasters
- Vercel Docs: https://vercel.com/docs

---

**Next:** Read `SEO_SETUP_GUIDE.md` for advanced optimization tips!
