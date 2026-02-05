- Clean chat interface in the browser
- Node.js backend API route (`/api/chat`)
- Uses OpenAI-compatible chat completions endpoint
- Easy environment setup with `.env`

## Requirements

- Node.js 18+ (for native `fetch`)
- An API key for your AI provider (OpenAI-compatible)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in project root:

```env
OPENAI_API_KEY=your_api_key_here
# Optional:
# OPENAI_MODEL=gpt-4o-mini
# OPENAI_API_URL=https://api.openai.com/v1/chat/completions
# PORT=3000
```

3. Start the app:

```bash
npm start
```

4. Open Chrome and go to:

```text
http://localhost:3000
```

## Notes

- The frontend sends the conversation to the backend.
- The backend calls the configured AI endpoint and returns the assistant reply.
- If you want to use another OpenAI-compatible provider, only update `OPENAI_API_URL` (and key/model if needed).
