# n8n Scraper Setup - BananaPrompts to PROMPT LIBRARY

## 🎯 What This Does

Automatically scrapes prompts from bananaprompts.xyz and imports them to your PROMPT LIBRARY site.

### Features:
- ✅ Extracts title, prompt, image, and tags
- ✅ Downloads and optimizes images
- ✅ Auto-uploads to your site
- ✅ Sets creator as "AdX"
- ✅ Secure API key authentication
- ✅ Error handling and logging

## 📋 Prerequisites

1. **n8n installed** (self-hosted or n8n.cloud)
2. **Your site deployed** on Vercel
3. **Supabase configured**

## 🔧 Setup Steps

### Step 1: Generate API Key

Generate a secure API key:

```bash
# On Mac/Linux
openssl rand -hex 32

# Or use this online: https://generate-random.org/api-key-generator
```

Copy the generated key (example: `a1b2c3d4e5f6...`)

### Step 2: Add API Key to Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add new variable:
   - **Name**: `ADMIN_API_KEY`
   - **Value**: `your-generated-api-key`
   - Check all environments
5. Save and **Redeploy**

### Step 3: Import n8n Workflow

1. Open n8n
2. Click **"+"** → **Import from File**
3. Select: `n8n-workflows/bananaprompts-scraper.json`
4. Click **Import**

### Step 4: Configure n8n Workflow

1. **Open the workflow** in n8n
2. **Click on "Import to PROMPT LIBRARY" node**
3. **Add Credentials**:
   - Type: Header Auth
   - Name: `x-api-key`
   - Value: `your-generated-api-key` (same as Step 1)
4. **Update the URL** in "Import to PROMPT LIBRARY" node:
   - Change to: `https://www.promptlibrary.space/api/admin/prompts/import`
5. **Save** the workflow

### Step 5: Test the Workflow

1. **Update the URL** in "Manual Trigger" node:
   - Change to any bananaprompts.xyz prompt URL
   - Example: `https://www.bananaprompts.xyz/prompts/7cca7d18-0a73-4386-bf11-7cb14a9e3926`

2. **Click "Execute Workflow"**

3. **Check the results**:
   - Green checkmarks = success
   - Red = error (check logs)

4. **Verify on your site**:
   - Go to: https://www.promptlibrary.space/images
   - Look for the imported prompt

## 📊 Workflow Breakdown

### Node 1: Manual Trigger
- **Purpose**: Start the workflow
- **Input**: BananaPrompts URL
- **Output**: URL to scrape

### Node 2: Fetch Prompt Page
- **Purpose**: Download the HTML page
- **Method**: HTTP GET request
- **Output**: Raw HTML

### Node 3: Extract Data
- **Purpose**: Parse HTML and extract data
- **Extracts**:
  - Title from `<h1>` tag
  - Prompt from `<p class="whitespace-pre-wrap">`
  - Image URL (highest quality: 3840w)
  - Tags from `<span>` elements
- **Sets**: Creator as "AdX"
- **Output**: Structured JSON

### Node 4: Import to PROMPT LIBRARY
- **Purpose**: Send data to your API
- **Method**: POST request
- **Authentication**: API key in header
- **Body**: JSON with all extracted data
- **Output**: Success/error response

## 🔄 Automation Options

### Option 1: Bulk Import (Multiple URLs)

Add a **"Split In Batches"** node:

```json
{
  "urls": [
    "https://www.bananaprompts.xyz/prompts/url-1",
    "https://www.bananaprompts.xyz/prompts/url-2",
    "https://www.bananaprompts.xyz/prompts/url-3"
  ]
}
```

### Option 2: Schedule (Auto-scrape)

Add a **"Schedule Trigger"** node:
- Run daily at 2 AM
- Scrape latest prompts
- Auto-import new ones

### Option 3: Webhook (On-demand)

Add a **"Webhook"** node:
- Trigger via URL
- Send prompt URL in POST body
- Instant import

### Option 4: Google Sheets

Add a **"Google Sheets"** node:
- List URLs in spreadsheet
- Auto-process all rows
- Mark as imported

## 🛡️ Security

### API Key Protection:
- ✅ Never commit API key to git
- ✅ Store in environment variables only
- ✅ Use different keys for dev/production
- ✅ Rotate keys periodically

### Rate Limiting:
- Don't scrape too fast (respect source site)
- Add delays between requests
- Use n8n's "Wait" node (5-10 seconds)

## 🐛 Troubleshooting

### Error: "Unauthorized - Invalid API key"
- Check API key in Vercel matches n8n
- Ensure you redeployed after adding key
- Verify header name is `x-api-key`

### Error: "Failed to download image"
- Image URL might be invalid
- Check if image exists on source site
- Try a different prompt URL

### Error: "Database insert failed"
- Check Supabase connection
- Verify all required fields present
- Check for duplicate slugs

### Workflow doesn't start:
- Click "Execute Workflow" button
- Check if workflow is active
- Look for red error indicators

### Data not extracting correctly:
- Source site HTML might have changed
- Update CSS selectors in "Extract Data" node
- Test with different prompt URLs

## 📝 Customization

### Change Creator Name:

In "Extract Data" node, change:
```javascript
creatorHandle: 'AdX',
```
To:
```javascript
creatorHandle: 'YourName',
```

### Add More Fields:

Extract additional data:
```javascript
// Extract likes count
const likesMatch = html.match(/<span[^>]*>(\d+) likes<\/span>/);
const likes = likesMatch ? parseInt(likesMatch[1]) : 0;
```

### Filter by Tags:

Add condition node:
```javascript
// Only import if has "cinematic" tag
return $json.tags.includes('cinematic');
```

## 🚀 Advanced: Scrape Multiple Sites

Create separate workflows for:
- PromptBase
- Lexica.art
- PromptHero
- Reddit posts
- Twitter threads

Each with custom extractors!

## 📊 Monitoring

### Check Import Success:

1. **n8n Executions**:
   - View → Executions
   - See success/failure rate

2. **Your Site**:
   - Admin panel: `/adminconstantine`
   - Check new prompts

3. **Supabase**:
   - Table Editor → prompts
   - Filter by creator: "AdX"

## 🎉 You're Ready!

Your scraper is set up and ready to import prompts automatically!

### Quick Test:
1. Open n8n workflow
2. Update URL in "Manual Trigger"
3. Click "Execute Workflow"
4. Check your site for new prompt

### Next Steps:
- Set up scheduled imports
- Add more source sites
- Create bulk import spreadsheet
- Monitor and optimize

Need help? Check the n8n docs or reach out!
