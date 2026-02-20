# ClientPilot AI — Embeddable AI Customer Support Chatbot

ClientPilot AI is a full-stack SaaS-style customer support chatbot built with Next.js App Router, MongoDB, Scalekit authentication, and Google Gemini.

It lets each user configure their own business knowledge in a dashboard and embed a chatbot widget on any website using a single script tag.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- MongoDB + Mongoose
- Scalekit (`@scalekit-sdk/node`) for auth/session
- Gemini (`@google/genai`) for AI responses
- Tailwind CSS 4

## Core Features

- Scalekit login/logout + token validation
- Per-user chatbot configuration (business info + knowledge base)
- AI response generation constrained to configured business context
- Script-based embeddable chatbot (`/chatBot.js`)
- Dashboard for managing settings
- Embed page that generates copy-paste script with `data-owner-id`

## Project Structure

```
app/
	api/
		auth/login, auth/callback, auth/logout
		chat/
		settings/
		settings/get/
	dashboard/
	embed/
public/
	chatBot.js
src/
	components/
	lib/
	model/
	proxy.ts
```

## Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGODB_URL=<your_mongodb_connection_string>

SCALEKIT_ENVIRONMENT_URL=<your_scalekit_environment_url>
SCALEKIT_CLIENT_ID=<your_scalekit_client_id>
SCALEKIT_CLIENT_SECRET=<your_scalekit_client_secret>

GEMINI_API_KEY=<your_google_gemini_api_key>
```

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Open:

- Home: `http://localhost:3000`
- Dashboard: `http://localhost:3000/dashboard`
- Embed page: `http://localhost:3000/embed`

## Auth + Access Flow

- `/api/auth/login` creates the Scalekit auth redirect URL.
- `/api/auth/callback` exchanges code for session and stores `access_token` cookie.
- `/api/auth/logout` clears the cookie.
- `src/proxy.ts` protects `/dashboard/*` routes when no session exists.

## API Endpoints

### `POST /api/settings`

Upserts chatbot settings for an `ownerId`:

```json
{
	"ownerId": "user_id",
	"businessName": "Acme Store",
	"supportEmail": "support@acme.com",
	"knowledge": "Return policy, shipping info, FAQ..."
}
```

### `POST /api/settings/get`

Fetches saved settings by `ownerId`.

### `POST /api/chat`

Generates AI response using configured business knowledge:

```json
{
	"ownerId": "user_id",
	"message": "What is your return policy?"
}
```

The API sets CORS headers to allow widget-based requests.

## Embed the Chatbot

Use the embed code from `/embed`, or add manually before `</body>`:

```html
<script src="http://localhost:3000/chatBot.js" data-owner-id="YOUR_OWNER_ID"></script>
```

For production, replace `http://localhost:3000` with your deployed domain.

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Deployment Notes

- Deploy to Vercel (or any Next.js-compatible host).
- Set all environment variables in deployment settings.
- Ensure `NEXT_PUBLIC_APP_URL` matches the deployed URL.
- Update embed script source to your production domain.

## Current Scope

This implementation is focused on AI-powered support replies from user-provided knowledge and basic SaaS-style configuration/auth flow.
