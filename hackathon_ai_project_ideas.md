# GDG Cloud Kolkata APL: 5 AI Project Ideas

## Quick Recommendation

If you need to finalize fast, pick **Idea 1: ParaPulse** or **Idea 2: SkillBridge Kolkata**.

- **ParaPulse** has the strongest community relevance and visual demo.
- **SkillBridge Kolkata** is easiest to build fast and tells a strong student/developer story.

---

## 1. ParaPulse: AI Community Issue Reporter

**Target user:** Local residents, student volunteers, RWAs, community organizers.

**Problem:** People notice broken streetlights, garbage piles, unsafe drains, waterlogging, or damaged roads, but they rarely know how to write a proper complaint or where to send it.

**Solution:** A mobile-first web app where users upload a photo, short voice note, or text about a local issue. The app converts it into a clean civic report with category, severity, location, suggested authority, and a shareable complaint message.

**Why it matters:** It turns casual community frustration into structured, actionable reports that volunteers or local groups can escalate.

**Tech stack:**

- **Frontend:** Next.js or Vite React
- **UI:** Tailwind CSS
- **Storage:** Supabase or Firebase
- **Map:** Leaflet + OpenStreetMap
- **AI:** Gemini / GPT-4o-mini vision + text

**AI component:**

- Classifies civic issue from image/text.
- Extracts severity and urgency.
- Generates complaint text in English/Bengali/Hindi.
- Detects duplicate or similar reports by area and issue type.

**MVP scope:**

- Upload image or enter text.
- Auto-generate issue category, severity, and complaint draft.
- Save report with location.
- Show all reports on a map.
- Add one-click copy/share complaint message.

**Demo pitch:**

> “Imagine I see waterlogging outside a metro station. I take one photo, ParaPulse identifies it as a waterlogging hazard, detects urgency, generates a proper complaint, pins it on a community map, and makes it shareable for escalation. It helps communities move from complaining in WhatsApp groups to creating actionable civic records.”

---

## 2. SkillBridge Kolkata: AI Mentor for Student Project Builders

**Target user:** College students, beginner developers, hackathon participants.

**Problem:** Many students want to build projects but get stuck choosing realistic ideas, breaking them into tasks, or understanding what to learn next.

**Solution:** An AI project-planning assistant that converts a student’s skill level, available time, and interests into a buildable project plan with milestones, tech stack, learning links, and demo script.

**Why it matters:** It helps students move from tutorial-watching to actually shipping projects, especially in local developer communities.

**Tech stack:**

- **Frontend:** Vite React
- **UI:** Tailwind CSS + shadcn/ui
- **Storage:** LocalStorage or Supabase
- **AI:** Gemini / GPT-4o-mini

**AI component:**

- Converts vague goals into scoped project ideas.
- Generates personalized milestones based on time and skill level.
- Suggests “minimum demo path” instead of overbuilt plans.
- Creates a 60-second pitch from the project plan.

**MVP scope:**

- Form: skill level, time available, interests, team size.
- Generate 3 project ideas.
- Select one idea and generate task breakdown.
- Generate GitHub README and demo pitch.
- Export as Markdown.

**Demo pitch:**

> “A first-year student says: I know HTML, basic JS, and have 8 hours. SkillBridge gives them three realistic community-focused projects, picks a stack they can actually use, creates tasks, and writes the demo pitch. It is like a hackathon mentor that helps beginners ship instead of freeze.”

---

## 3. LocalAid Lens: AI Emergency Resource Finder

**Target user:** Citizens, student volunteers, NGOs, event organizers, local community groups.

**Problem:** During medical, blood donation, food, or shelter emergencies, people post scattered requests across WhatsApp, Twitter/X, and Instagram. Volunteers waste time understanding urgency and verifying details.

**Solution:** A dashboard where volunteers paste emergency posts or upload screenshots. AI extracts the need, location, urgency, contact info, and creates a verified action card.

**Why it matters:** It reduces chaos during local emergencies and helps volunteers prioritize real, urgent requests.

**Tech stack:**

- **Frontend:** Next.js or Vite React
- **UI:** Tailwind CSS
- **Storage:** Supabase
- **AI:** Gemini / GPT-4o-mini with OCR/vision
- **Optional:** Twilio/WhatsApp share link, Google Maps link

**AI component:**

- OCR from screenshots.
- Extracts structured fields: need, location, contact, deadline, urgency.
- Detects missing critical info.
- Generates volunteer call scripts and verification checklist.

**MVP scope:**

- Paste text or upload screenshot.
- AI converts it into a structured emergency card.
- Mark status: new, verifying, resolved.
- Filter by urgency/type/location.
- Generate “message to requester” and “message to volunteer group.”

**Demo pitch:**

> “Here is a chaotic WhatsApp screenshot asking for B+ blood near Salt Lake. LocalAid Lens extracts the blood group, hospital, contact, and urgency, flags missing info, and creates a volunteer-ready card. In emergencies, clarity saves time.”

---

## 4. JobPost Shield: AI Scam Detector for Students

**Target user:** Students, freshers, placement cells, community job boards.

**Problem:** Students often receive fake internship/job posts asking for registration fees, unpaid work, suspicious forms, or unrealistic salaries.

**Solution:** A web app where users paste a job post, upload a screenshot, or enter a link. AI analyzes scam signals and gives a risk score, explanation, and safer response.

**Why it matters:** It protects students from financial fraud, data theft, and exploitative opportunities.

**Tech stack:**

- **Frontend:** Vite React
- **UI:** Tailwind CSS
- **AI:** Gemini / GPT-4o-mini
- **Storage:** LocalStorage or Supabase for community reports
- **Optional:** Browser extension mock UI

**AI component:**

- Extracts claims from the job post.
- Detects red flags: payment requests, fake urgency, unrealistic salary, personal data collection, suspicious wording.
- Produces a student-friendly risk explanation.
- Generates a safe reply asking for verification details.

**MVP scope:**

- Paste job post or upload screenshot.
- Show scam risk score.
- Highlight suspicious lines.
- Generate safe reply.
- Save/report suspicious posts to a community board.

**Demo pitch:**

> “A student receives an internship promising ₹50,000 per month but asking for a ₹999 registration fee. JobPost Shield highlights the fee, urgency, vague company details, and gives it a high-risk score. It also generates a polite reply asking for proof. This is practical AI safety for students.”

---

## 5. AccessMate: AI Accessibility Fixer for Community Websites

**Target user:** Local NGOs, clubs, student communities, event organizers, small businesses.

**Problem:** Many community websites and event pages are hard to use for people with visual, cognitive, or language accessibility needs. Small communities do not know how to audit or fix them.

**Solution:** A tool where organizers paste a website URL or page text. AI audits accessibility issues and generates simple fixes: better alt text, clearer event descriptions, plain-language summaries, and multilingual versions.

**Why it matters:** Community information should be accessible to everyone, not just technically comfortable users.

**Tech stack:**

- **Frontend:** Next.js or Vite React
- **UI:** Tailwind CSS
- **AI:** Gemini / GPT-4o-mini
- **Optional:** Playwright or simple URL fetcher
- **Optional:** Lighthouse CLI if time permits

**AI component:**

- Rewrites confusing content into plain language.
- Generates image alt text from screenshots/images.
- Creates Bengali/Hindi summaries.
- Suggests accessibility fixes prioritized by impact.

**MVP scope:**

- Paste event/page text or upload screenshot.
- Generate accessibility score.
- Show top 5 issues.
- Generate improved version of the content.
- Export fixed copy as Markdown.

**Demo pitch:**

> “I paste a confusing community event page. AccessMate explains what is inaccessible, rewrites it in plain language, creates Bengali and Hindi summaries, and generates alt text. In one minute, a small community page becomes easier for more people to understand.”

---

# Judge-Focused Ranking

## Best Overall Pick: ParaPulse

**Why:** Strong local relevance, visual demo, map UI, civic impact, and clear AI role.

## Fastest to Build: SkillBridge Kolkata

**Why:** Mostly form-to-AI-to-Markdown flow, easy to finish in 2 hours with vibe coding.

## Most Emotional/High-Impact: LocalAid Lens

**Why:** Emergency response and volunteer coordination create a strong human story.

## Most Student-Relatable: JobPost Shield

**Why:** Fake internships and job scams are immediately understandable to judges and students.

## Most Community-Inclusive: AccessMate

**Why:** Accessibility + multilingual support aligns well with “building for the community.”

---

# 2-Hour Execution Advice

If you only have 2 hours, do **not** build login, complex backend, or production workflows.

Build this structure:

1. **Landing page:** Problem, one-line promise, target user.
2. **Input panel:** Text/image upload/form.
3. **AI output card:** Structured result with useful fields.
4. **Demo data:** 2–3 realistic Kolkata examples.
5. **Export/share button:** Copy message, download Markdown, or save locally.

A polished, focused demo beats a half-built complex platform.
