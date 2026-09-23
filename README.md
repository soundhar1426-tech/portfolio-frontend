# Soundhar D M – Portfolio Frontend

Frontend web application for **Soundhar D M's Developer Portfolio**, built with React 18, Vite, and custom CSS design tokens.

---

## ✨ Features

- **Dynamic Theme**: Dark & Light mode toggle with smooth CSS transitions and persistent `localStorage` preference.
- **Projects Showcase**: Dynamic project grid loaded from the backend API.
- **Certifications Showcase**: Certificates display with interactive multi-format **Certificate Viewer** (PDF preview & image support).
- **Inline Admin Management**: Discreet management triggers (`+`, Edit, Delete) with secure password verification.
- **Tech Stack & Skills**: Categorized skills with no artificial rating bars.
- **Responsive Layout**: Designed to look stunning on mobile, tablet, laptop, and ultra-wide screens.

---

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
If deploying backend on a separate domain (e.g. Render/Railway), copy `.env.example`:
```bash
cp .env.example .env
```
And set `VITE_API_URL`:
```env
VITE_API_URL=https://your-backend-domain.com
```
*(In local development with Vite dev server, it automatically proxies `/api` to `http://localhost:5000`)*

### 3. Run Development Server
```bash
npm run dev
```
*Frontend runs on `http://localhost:5173`*

### 4. Build for Production
```bash
npm run build
```
Production assets are generated in `dist/`.
