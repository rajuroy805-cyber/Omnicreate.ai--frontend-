# OmniCreate.ai

The World's Most Affordable All-in-One AI Studio.

## Features
- **Image to Video:** Powered by RunwayML Gen-2
- **Universal Video Dubbing:** Powered by ElevenLabs & Wav2Lip (via Replicate)
- **3D Anime Studio:** Text-to-Video Generation

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Storage:** Cloudinary
- **AI APIs:** RunwayML, ElevenLabs, Replicate

## How to Run Locally

### 1. Start the Frontend
```bash
npm install
npm run dev
```

### 2. Start the Backend Server
```bash
cd server
npm install
npm start
```

## Environment Variables Needed
Before running in production, you need to set up the following API keys in `server/server.js`:

- `CLOUDINARY_URL` (or cloud_name, api_key, api_secret)
- `RUNWAY_API_KEY`
- `ELEVENLABS_API_KEY` (Added)
- `REPLICATE_API_TOKEN` (Added)

## GitHub Deployment
This project is ready to be pushed to GitHub. The `.gitignore` is already configured to ignore `node_modules` and the `server/uploads` folder.