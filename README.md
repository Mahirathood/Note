# Notes App (Node.js + Express + MongoDB)

## Overview
Minimal Notes application demonstrating a full-stack setup with:
- Node.js + Express (backend API)
- MongoDB with Mongoose (database)
- Plain HTML/CSS/JavaScript (frontend)

## Included files
- `server.js` - Express server + MongoDB connection
- `routes/notes.js` - CRUD API for notes
- `models/Note.js` - Mongoose model
- `public/` - frontend (index.html, css, js)
- `.env.example` - example environment file
- `package.json` - project manifest

## Run locally (VS Code)
1. Unzip project and open in VS Code.
2. Install dependencies:
   ```
   npm install
   ```
3. Create `.env` based on `.env.example` and set `MONGODB_URI`.
   - Use a local MongoDB (`mongodb://localhost:27017/notesapp`) or a MongoDB Atlas connection string.
4. Start the app:
   ```
   npm start
   ```
   For development with auto restart:
   ```
   npm run dev
   ```
5. Open the app in your browser at `http://localhost:3000`.
6. Live Open the app in your browser at `https://note-fhci.onrender.com/`.

## Deploy to Render.com (summary)
1. Push this repo to GitHub.
2. Sign in to Render and create a new **Web Service** linked to the GitHub repo.
3. Build Command: `npm install`
   Start Command: `npm start`
4. In Render's Dashboard, set an Environment Variable `MONGODB_URI` with your production connection string.
5. Deploy. Render provides the `PORT` environment variable automatically and your app reads it via `process.env.PORT`.

## API Endpoints
- `GET /api/notes` - list notes
- `POST /api/notes` - create note (JSON: { title, content })
- `PUT /api/notes/:id` - update note
- `DELETE /api/notes/:id` - delete note

## Notes
- Make sure your MongoDB Atlas IP whitelist permits Render's outgoing IPs (or use 0.0.0.0/0 for quick testing).
- For production, secure your DB credentials and do not commit `.env`.
