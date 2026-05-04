# ParaPulse 🏙️

**From community complaints to actionable civic reports in seconds.**

ParaPulse is an AI-powered civic issue reporting platform that helps local residents, students, RWAs, and NGOs turn photos or short descriptions of community problems into structured, shareable, location-based action reports.

🌐 **Live Demo:** [https://aritra.infinityfree.me](https://aritra.infinityfree.me)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Demo Walkthrough](#demo-walkthrough)
- [AI Integration](#ai-integration)
- [Project Structure](#project-structure)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

### Problem Statement

In many neighborhoods, people notice civic problems like garbage accumulation, waterlogging, broken streetlights, open drains, and damaged footpaths. However, reporting these issues is frustrating because residents often don't know:

- How to describe the issue formally
- Which category the issue belongs to
- How urgent it is
- Which authority to contact
- How to write a usable complaint

As a result, issues remain scattered across WhatsApp groups and social media instead of becoming actionable community reports.

### Solution

ParaPulse bridges this gap by allowing users to:

1. **Upload** a photo or enter a short text description of a civic issue
2. **Add** a location (landmark or area name)
3. **Generate** an AI-powered structured civic report with category, severity, suggested authority, complaint message, and volunteer next steps
4. **Save** the report to a community map
5. **Share** the complaint via WhatsApp, email, or copy-paste
6. **Track** issue status from New → Reported → In Progress → Resolved

### Target Users

- **Local residents** who notice civic issues but don't know how to report them
- **Student volunteers** organizing improvement drives
- **Resident welfare associations (RWAs)** needing structured evidence for escalation
- **NGOs** working on sanitation, safety, accessibility, or infrastructure
- **Community organizers** wanting a lightweight civic issue dashboard

### Why AI Matters Here

AI isn't just a chatbot in ParaPulse. It performs real civic intelligence:

- Understands unstructured issue input
- Extracts the civic problem type (category)
- Estimates severity without exaggeration
- Converts casual text into formal complaint language
- Suggests the responsible authority
- Detects missing information
- Generates volunteer action guidance

---

## Features

### Core Reporting
- 📝 **Issue Reporting** — Text description + location + optional photo evidence
- 🤖 **AI Analysis** — Gemini-powered classification, severity estimation, and complaint generation
- 📋 **Structured Reports** — Category, severity, summary, authority, missing info, complaint message
- 📍 **Community Map** — All issues pinned on an interactive Leaflet/OpenStreetMap

### Multilingual Support
- 🌐 **3 Languages** — Generate reports in English, Bengali (বাংলা), or Hindi (हिन्दी)
- 🎤 **Voice Input** — Describe issues by speaking (supports EN, BN, HI via Web Speech API)
- 📸 **OCR from Screenshots** — Extract text from complaint photos/screenshots via Gemini

### Civic Integration
- 🏛️ **Authority Directory** — Searchable database of 14+ Kolkata civic departments with contact info
- 📧 **Email Generation** — One-click `mailto:` links with pre-filled complaint emails
- 🔗 **Portal Links** — Direct links to official complaint portals (KMC, CESC, BMC, PWD)
- 📊 **Escalation Timeline** — Track issue lifecycle: Created → Verified → Emailed → Resolved

### Community Features
- 👍 **Community Verification** — "I've seen this too" anonymous confirmation system
- 📈 **Volunteer Dashboard** — Ward-level analytics, category breakdown, trend summaries
- 🔍 **Duplicate Detection** — Jaccard similarity clustering of similar reports
- 🏢 **Workspace Mode** — NGO/RWA filtered view for specific wards and categories

### Sharing & Export
- 📱 **WhatsApp Share** — One-click sharing with formatted complaint text
- 📋 **Copy Complaint** — Copy the formal complaint to clipboard
- 📥 **Markdown Download** — Download the full report as a `.md` file
- 🗺️ **Map Visualization** — Severity-colored markers with popups

### Resilience
- 🔄 **Fallback Mode** — Local keyword-based report generation when AI is unavailable
- ⏱️ **Rate Limiting** — Smart throttling for free Gemini API tier (4s minimum gap)
- 💾 **LocalStorage Persistence** — All data persists across browser sessions

---

## Screenshots

### Dashboard / Main View
![Screenshot 1](./screenshots/screenshot_1.png)

### Issue Details / Reporting
![Screenshot 2](./screenshots/screenshot_2.png)

### Overview
![Screenshot 3](./screenshots/screenshot_3.png)

### Additional View 1
![Screenshot 4](./screenshots/screenshot_4.png)

### Additional View 2
![Screenshot 5](./screenshots/screenshot_5.png)

### Additional View 3
![Screenshot 6](./screenshots/screenshot_6.jpeg)

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | React 19 + TypeScript 6 | Type-safe, fast component model |
| **Build Tool** | Vite 8 | Sub-second HMR, lightning-fast builds |
| **Styling** | Tailwind CSS 4 | Utility-first, responsive, consistent design |
| **Map** | Leaflet + React Leaflet + OpenStreetMap | Free, no API key needed, good for civic pins |
| **AI** | Google Gemini (free tier) | Text + image understanding, JSON mode |
| **Icons** | Lucide React | Clean, consistent SVG icon set |
| **Storage** | LocalStorage (browser) | No backend needed for MVP |
| **Deployment** | InfinityFree (static hosting) | Free, simple static file serving |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (SPA)                         │
├──────────┬──────────┬──────────┬──────────┬─────────────────┤
│  Landing │  Report  │   Map    │Dashboard │   Directory      │
│   Page   │   Page   │   Page   │   Page   │     Page         │
├──────────┴──────────┴──────────┴──────────┴─────────────────┤
│                    Component Layer                            │
│  ReportForm │ IssueCard │ VoiceInput │ VerificationPanel     │
│  CommunityMap │ WorkspaceBanner │ EscalationTimeline         │
├─────────────────────────────────────────────────────────────┤
│                    Library Layer                             │
│  generateIssue │ analytics │ rateLimiter │ multilingual      │
│  emailGenerator │ ocrFromImage │ workspaceMode │ router     │
├─────────────────────────────────────────────────────────────┤
│                     Data Layer                               │
│  demoIssues │ categories │ severity │ status │ authorities   │
├─────────────────────────────────────────────────────────────┤
│  LocalStorage                    │  Gemini API (free tier)   │
└──────────────────────────────────┴──────────────────────────┘
```

**Data Flow:**
1. User enters description + location + optional photo
2. `generateIssue.ts` sends to Gemini API with civic analyst prompt
3. Response is parsed, validated, and normalized into a `CivicIssue` object
4. Issue is displayed as a card with all AI-enriched fields
5. User saves to LocalStorage → issue appears on the community map
6. Analytics are computed client-side from the stored issue list

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **Google Gemini API key** (free tier is sufficient)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/apl-ccu.git
cd apl-ccu

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

Output goes to the `dist/` directory. Deploy the contents to any static hosting service.

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Required: Your Google Gemini API key (free tier works)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Override the Gemini model (default: gemini-3.1-flash-lite-preview)
VITE_GEMINI_MODEL=gemini-3.1-flash-lite-preview
```

> **Note:** The free Gemini tier allows ~15 requests/minute. ParaPulse includes a built-in rate limiter (4-second gap between requests) and a local fallback generator, so the app never breaks even when the API is rate-limited or unavailable.

---

## Demo Walkthrough

### Main Demo Scenario

You're a student walking near **Salt Lake Sector V** after rain. You notice waterlogging near a bus stop.

1. Open ParaPulse → click **"Report an Issue"**
2. Enter description: *"After heavy rain, the road near the Salt Lake Sector V bus stop is badly waterlogged. Pedestrians cannot cross safely."*
3. Enter location: *"Near Salt Lake Sector V bus stop, Kolkata"*
4. (Optional) Upload a photo of the waterlogging
5. Select language: English / বাংলা / हिन्दी
6. Click **"Generate report"**
7. Review the AI-generated report with category (Waterlogging), severity (High), authority, complaint message
8. Click **"Save report"** → issue appears on the community map
9. Click **"Copy complaint"** or **"Email authority"** or **"Share on WhatsApp"**

### Backup Demo Examples

| Issue | Location | Expected Category | Severity |
|-------|----------|-------------------|----------|
| Garbage pile near market | Gariahat, Kolkata | Garbage | Medium |
| Broken streetlight near bus stand | Jadavpur, Kolkata | Streetlight | High |
| Open drain near school | Park Circus, Kolkata | Drainage | Urgent |
| Damaged footpath | Dhakuria bridge, Kolkata | Road Damage | Medium |

### 1-Minute Pitch

> "ParaPulse helps communities turn everyday civic problems into actionable reports. A resident uploads a photo or short description, adds the location, and AI generates a structured report with category, severity, suggested authority, and a formal complaint message. The issue is saved to a community map so volunteers can see what's urgent, coordinate action, and share better evidence. ParaPulse is not just another complaint form — it's a community-first civic reporting workflow."

---

## AI Integration

### Model & Provider

- **Provider:** Google Gemini (free tier)
- **Model:** `gemini-3.1-flash-lite-preview` (configurable via env var)
- **Features used:** Text generation, image understanding, JSON mode

### Prompt Strategy

The AI is instructed to act as a **civic issue analyst** for Kolkata. The prompt:

- Forces strict JSON output with predefined keys
- Constrains categories and severity to allowed values
- Asks for formal, concise language without exaggeration
- Requests missing information detection
- Supports multilingual output (Bengali, Hindi) via appended instructions
- Includes injection protection (ignores user instructions to change format)

### Rate Limiting (Free Tier)

The free Gemini API allows ~15 requests/minute. ParaPulse handles this with:

1. **Shared throttle** — 4-second minimum gap between all API calls (generate, OCR)
2. **Queue-based** — concurrent requests are serialized
3. **UI feedback** — loading states and "please wait" messages
4. **Local fallback** — keyword-based report generation when the API is unavailable

### Fallback Generator

When the AI is unavailable, a local keyword-based classifier:
- Matches issue descriptions against category regex patterns
- Assigns default severity and authority
- Generates a formal complaint template
- Returns the same `CivicIssue` shape so the UI is identical

---

## Project Structure

```
apl-ccu/
├── index.html                    # Entry point
├── package.json                  # Dependencies and scripts
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript config
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Environment template
├── README.md                     # This file
├── DEMO_READINESS.md             # Demo checklist
│
├── public/                       # Static assets
├── screenshots/                  # Project screenshots
│
└── src/
    ├── main.tsx                  # React entry point
    ├── App.tsx                   # Root component with routing
    ├── index.css                 # Global styles and animations
    │
    ├── types/
    │   └── issue.ts              # CivicIssue, IssueDraft, and related types
    │
    ├── data/
    │   ├── categories.ts         # 8 civic issue categories
    │   ├── severity.ts           # Low/Medium/High/Urgent definitions
    │   ├── status.ts             # Issue lifecycle statuses
    │   ├── demoIssues.ts         # 5 pre-loaded Kolkata demo reports
    │   └── authorities.ts        # 14 Kolkata civic authority entries
    │
    ├── lib/
    │   ├── generateIssue.ts      # AI + fallback report generation
    │   ├── issueStorage.ts       # LocalStorage persistence
    │   ├── router.ts             # Hash-based SPA router
    │   ├── locations.ts          # Kolkata location → coordinates
    │   ├── leaflet.ts            # Custom Leaflet marker icons
    │   ├── rateLimiter.ts        # Gemini API request throttle
    │   ├── multilingual.ts       # EN/BN/HI language config
    │   ├── ocrFromImage.ts       # OCR text extraction via Gemini
    │   ├── analytics.ts          # Ward analytics, duplicate clustering
    │   ├── trendSummary.ts       # Trend computation for dashboard
    │   ├── emailGenerator.ts     # mailto: link generation
    │   └── workspaceMode.ts      # NGO/RWA workspace configuration
    │
    ├── components/
    │   ├── badges/
    │   │   ├── CategoryBadge.tsx
    │   │   ├── SeverityBadge.tsx
    │   │   └── StatusBadge.tsx
    │   ├── issue/
    │   │   ├── IssueCard.tsx           # Full report card with actions
    │   │   ├── IssueListItem.tsx       # Compact issue summary
    │   │   ├── VerificationPanel.tsx   # "I've seen this too" button
    │   │   └── EscalationTimeline.tsx  # Escalation history display
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   └── WorkspaceBanner.tsx     # NGO/RWA mode banner
    │   ├── map/
    │   │   └── CommunityMap.tsx
    │   └── report/
    │       ├── ReportForm.tsx          # Main reporting form
    │       └── VoiceInput.tsx          # Speech-to-text component
    │
    └── pages/
        ├── LandingPage.tsx
        ├── ReportPage.tsx
        ├── MapPage.tsx
        ├── DashboardPage.tsx           # Volunteer analytics dashboard
        └── AuthorityDirectoryPage.tsx  # Searchable authority database
```

---

## Future Roadmap

Beyond the current implementation, potential next steps include:

- 🔐 **User Authentication** — Login/signup with real identity
- 📱 **Mobile PWA** — Installable progressive web app
- 🔔 **Push Notifications** — Alerts for status changes and nearby issues
- 🏙️ **Multi-city Support** — Authority directories for other Indian cities
- 📊 **Government API Integration** — Direct complaint submission to KMC, CESC portals
- 🤖 **Advanced AI** — Image-based damage assessment, urgency scoring from photos
- 👥 **Volunteer Network** — Verified volunteer profiles and coordination tools
- 🌍 **Multilingual OCR** — Extract Bengali/Hindi text from complaint documents

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code passes `npm run build` and `npm run lint` before submitting.

---

## License

This project was built for the APL-CCU hackathon. All rights reserved.

---

<p align="center">
  <strong>ParaPulse</strong> · AI-powered civic issue reporting<br/>
  Built for community action ❤️
</p>
