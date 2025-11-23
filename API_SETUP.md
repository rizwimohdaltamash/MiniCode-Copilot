# 🔑 API Setup Guide for Mini Code Copilot

This guide will help you configure your API keys to enable **real AI-powered code generation** instead of mock data.

## 📋 Quick Start

### 1. Copy the Environment File

```bash
cd frontend/mycopilot
copy .env.example .env
```

### 2. Get Your API Keys

You have **two options** for AI-powered code generation. You only need **ONE** of these:

#### Option A: Grok API (Groq) - **Recommended** ⚡
- **Speed**: Very fast response times
- **Free Tier**: Generous free tier available
- **Models**: Access to Mixtral and other powerful models

**Get your key**: [https://console.groq.com/keys](https://console.groq.com/keys)

1. Sign up for a free account at Groq
2. Go to the API Keys section
3. Create a new API key
4. Copy your key

#### Option B: OpenRouter - Alternative 🌐
- **Models**: Access to various free and paid models
- **Free Options**: Meta Llama 3.1 and other free models

**Get your key**: [https://openrouter.ai/keys](https://openrouter.ai/keys)

1. Sign up at OpenRouter
2. Navigate to Keys section
3. Create a new API key
4. Copy your key

### 3. Configure Your `.env` File

Open the `.env` file you created and add your API key(s):

```env
# Grok API Key (Recommended)
VITE_GROK_API_KEY=gsk_your_actual_key_here

# OR OpenRouter API Key (Alternative)
VITE_OPENROUTER_API_KEY=sk-or-your_actual_key_here
```

**Important**: 
- Replace `gsk_your_actual_key_here` or `sk-or-your_actual_key_here` with your actual API key
- You only need ONE API key (either Grok or OpenRouter)
- The app will try Grok first, then OpenRouter, then fall back to mock data

### 4. Restart Your Development Server

After adding your API key, restart the dev server:

```bash
npm run dev
```

## ✨ How It Works

### API Priority System

The app uses a **smart fallback system**:

1. **First**: Tries Grok API (if `VITE_GROK_API_KEY` is configured)
2. **Second**: Falls back to OpenRouter (if `VITE_OPENROUTER_API_KEY` is configured)
3. **Last**: Uses mock static code snippets (if no API keys are configured)

### Code Generation Features

When using real APIs, you get:
- ✅ **Custom code** tailored to your exact prompt
- ✅ **Language-specific** implementations
- ✅ **Well-commented** code with best practices
- ✅ **Up to 2000 tokens** per generation

### Prompt Validation

The app **only generates code** for coding-related questions:

✅ **Accepted Prompts**:
- "Create a function to sort an array"
- "Write a React component for a login form"
- "Generate a Python class for database connection"
- "Make an API call in JavaScript"

❌ **Rejected Prompts**:
- "What's the weather like?"
- "Tell me a joke"
- "How do I cook pasta?"

## 🔍 Troubleshooting

### Issue: Still seeing mock data

**Solution**:
1. Check that your `.env` file is in the correct location: `frontend/mycopilot/.env`
2. Verify your API key is correct (no extra spaces or quotes)
3. Make sure you restarted the dev server after adding the key
4. Open browser console (F12) to see which API is being attempted

### Issue: API errors in console

**Solution**:
1. **Grok API**: Verify your key at [https://console.groq.com/keys](https://console.groq.com/keys)
2. **OpenRouter API**: Check your key at [https://openrouter.ai/keys](https://openrouter.ai/keys)
3. Ensure you have API credits/quota remaining
4. The app will automatically fall back to the next option

### Issue: "No API keys configured" message

**Solution**:
- Your `.env` file is missing or not loaded
- Make sure the file is named exactly `.env` (not `.env.txt`)
- Restart your terminal and dev server

## 🎯 Testing Your Setup

After configuration, test with a simple prompt:

**Prompt**: "Create a function to reverse a string"

**Expected Result**:
- You should see actual AI-generated code (not the mock snippet)
- Console should log: `Code generated using: Grok API` or `Code generated using: OpenRouter API`
- No blue "Using Mock Data" message should appear

## 💡 Pro Tips

1. **Grok is faster**: If speed matters, use Grok API
2. **Free tier limits**: Both services have rate limits on free tiers
3. **Multiple keys**: You can configure both keys for redundancy
4. **Monitor usage**: Check your API dashboard to track usage

## 🔒 Security Notes

- ✅ The `.env` file is gitignored (never committed to your repo)
- ✅ API keys are only used client-side in your browser
- ⚠️ Don't share your `.env` file or API keys publicly
- ⚠️ Consider using environment variables in production

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GROK_API_KEY` | Optional | Grok (Groq) API key for fast code generation |
| `VITE_OPENROUTER_API_KEY` | Optional | OpenRouter API key as alternative/backup |

---

**Need help?** Check the console logs (F12 in browser) to see detailed API call information and any errors.
