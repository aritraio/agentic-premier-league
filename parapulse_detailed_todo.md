# ParaPulse Detailed Project TODO

## Goal

Build a polished hackathon MVP of **ParaPulse**, an AI-powered civic issue reporter that converts photos or short descriptions of local problems into structured, shareable civic reports and displays them on a community map.

---

# Priority Legend

- **P0:** Must finish for demo.
- **P1:** Important if time allows.
- **P2:** Nice-to-have or future scope.

---

# Phase 1: Product Scope and Demo Story

## 1.1 Finalize Product Positioning

- [x] **P0:** Finalize product name: `ParaPulse`.
- [x] **P0:** Finalize tagline: `From community complaints to actionable civic reports in seconds.`
- [x] **P0:** Write one-line description for landing page.
- [x] **P0:** Define primary target user: local residents and student volunteers.
- [x] **P0:** Define secondary target users: RWAs, NGOs, community organizers.
- [x] **P0:** Define core value proposition: turn messy local issue inputs into structured civic action reports.

### Final Product Positioning

- **Product name:** `ParaPulse`
- **Tagline:** `From community complaints to actionable civic reports in seconds.`
- **Landing page one-liner:** ParaPulse helps residents and volunteers turn photos or short descriptions of civic problems into structured, shareable reports that can be mapped, tracked, and escalated.
- **Primary target user:** Local residents and student volunteers who notice civic issues and need a faster way to create usable reports.
- **Secondary target users:** Resident welfare associations, NGOs, community organizers, and local volunteer groups.
- **Core value proposition:** ParaPulse converts messy local issue inputs into clear civic action reports with category, severity, location, suggested authority, complaint text, and volunteer next steps.
- **Top issue categories for MVP:** Waterlogging, garbage accumulation, broken streetlights, open drains, damaged roads, public safety hazards, accessibility issues.

## 1.2 Finalize Problem Statement

- [x] **P0:** Write clear problem statement in 2–3 lines.
- [x] **P0:** Mention specific civic issues: waterlogging, garbage, broken streetlights, open drains, damaged roads.
- [x] **P0:** Explain why WhatsApp/social media complaints are not enough.
- [x] **P0:** Explain why structured reports help volunteers and communities.

### Final Problem Statement

Local civic problems such as waterlogging, garbage piles, broken streetlights, open drains, and damaged roads are often noticed by residents but only discussed informally in WhatsApp groups or social media posts. These complaints are scattered, emotional, incomplete, and hard for volunteers or authorities to prioritize. ParaPulse turns those messy inputs into structured reports so communities can document evidence, identify urgency, coordinate volunteers, and escalate issues more effectively.

## 1.3 Prepare Demo Scenario

- [x] **P0:** Choose main demo scenario: waterlogging near Salt Lake Sector V bus stop.
- [x] **P0:** Prepare sample user description.
- [x] **P0:** Prepare sample image or placeholder image.
- [x] **P0:** Prepare sample location text.
- [x] **P0:** Prepare expected AI output.
- [x] **P0:** Prepare one-minute pitch script.
- [x] **P1:** Prepare backup demo scenario: garbage near Gariahat market.
- [x] **P1:** Prepare backup demo scenario: broken streetlight near Jadavpur.

### Main Demo Scenario

- **Scenario:** Waterlogging near Salt Lake Sector V bus stop after rain.
- **Sample user description:** After heavy rain, the road near the Salt Lake Sector V bus stop is badly waterlogged. Pedestrians cannot cross safely, buses are stopping in the flooded area, and vehicles are splashing dirty water on people waiting nearby.
- **Sample image:** Use a placeholder image showing a flooded urban road, waterlogged bus stop, or rainy street.
- **Sample location text:** `Near Salt Lake Sector V bus stop, Kolkata`
- **Expected category:** Waterlogging
- **Expected severity:** High
- **Suggested authority:** Municipal drainage department / local ward office
- **Suggested volunteer action:** Share the report with nearby residents, add more photos if possible, warn pedestrians, and escalate the complaint to the ward office.
- **Expected complaint message:** There is severe waterlogging near the Salt Lake Sector V bus stop in Kolkata after rainfall. The flooded road is causing difficulty for pedestrians, bus passengers, and nearby traffic. Please inspect the drainage issue and arrange urgent clearing or repair to prevent further inconvenience and safety risks.

### Backup Demo Scenario 1

- **Scenario:** Garbage accumulation near Gariahat market.
- **Sample user description:** A large pile of garbage has been left near Gariahat market for two days. The smell is spreading, pedestrians are avoiding the area, and stray animals are tearing open the bags.
- **Sample location text:** `Near Gariahat market, Kolkata`
- **Expected category:** Garbage
- **Expected severity:** Medium
- **Suggested authority:** Municipal sanitation department / local ward office

### Backup Demo Scenario 2

- **Scenario:** Broken streetlight near Jadavpur.
- **Sample user description:** The streetlight near the Jadavpur 8B bus stand has not worked for several nights. The road becomes very dark after evening, creating safety concerns for students, pedestrians, and commuters.
- **Sample location text:** `Near Jadavpur 8B bus stand, Kolkata`
- **Expected category:** Broken streetlight
- **Expected severity:** High
- **Suggested authority:** Electricity maintenance department / local ward office

### Final 1-Minute Pitch Script

> “ParaPulse helps communities turn everyday civic problems into actionable reports. Today, people often post issues like waterlogging, garbage, or broken streetlights in WhatsApp groups, but those complaints are unstructured, hard to track, and difficult to escalate. With ParaPulse, a resident uploads a photo or short description, adds the location, and AI generates a structured report with category, severity, suggested authority, missing information, and a formal complaint message. The issue can then be saved to a community map so volunteers can see what is urgent, coordinate action, and share better evidence. ParaPulse is not just another complaint form — it is a community-first civic reporting workflow that helps people move from frustration to organized local action.”

---

# Phase 2: Project Setup

## 2.1 Create App

- [x] **P0:** Create Vite React app.
- [x] **P0:** Use TypeScript if comfortable; otherwise use JavaScript for speed.
- [x] **P0:** Start local dev server.
- [x] **P0:** Confirm app opens in browser.

## 2.2 Install Core Dependencies

- [x] **P0:** Install Tailwind CSS.
- [x] **P0:** Configure Tailwind content paths.
- [x] **P0:** Add global styles.
- [x] **P0:** Install icon library such as `lucide-react`.
- [x] **P0:** Install map libraries: `leaflet` and `react-leaflet`.
- [x] **P0:** Import Leaflet CSS.
- [ ] **P1:** Install toast library if needed.
- [ ] **P1:** Install Supabase client only if backend storage is planned.

## 2.3 Folder Structure

- [x] **P0:** Create `src/components` folder.
- [x] **P0:** Create `src/pages` or route-level component folder.
- [x] **P0:** Create `src/lib` folder for AI and storage helpers.
- [x] **P0:** Create `src/data` folder for demo issues.
- [x] **P0:** Create `src/types` folder if using TypeScript.

## 2.4 Environment Variables

- [x] **P0:** Create `.env` file.
- [x] **P0:** Add AI API key variable.
- [x] **P0:** Ensure `.env` is not committed.
- [x] **P0:** Create `.env.example` with placeholder variable names.
- [x] **P1:** Add Supabase URL and anon key placeholders if using Supabase.

---

# Phase 3: Data Design

## 3.1 Civic Issue Type

- [x] **P0:** Define issue fields: `id`, `title`, `category`, `severity`, `summary`, `location`, `status`, `createdAt`.
- [x] **P0:** Add AI fields: `suggestedAuthority`, `missingInfo`, `complaintMessage`, `volunteerAction`.
- [x] **P0:** Add optional image field: `imageUrl` or local preview URL.
- [x] **P0:** Add optional coordinates: `latitude`, `longitude`.

## 3.2 Categories

- [x] **P0:** Define category list.
- [x] **P0:** Include `Waterlogging`.
- [x] **P0:** Include `Garbage`.
- [x] **P0:** Include `Streetlight`.
- [x] **P0:** Include `Road Damage`.
- [x] **P0:** Include `Drainage`.
- [x] **P0:** Include `Public Safety`.
- [x] **P1:** Include `Accessibility`.
- [x] **P1:** Include `Other`.

## 3.3 Severity Levels

- [x] **P0:** Define severity levels: `Low`, `Medium`, `High`, `Urgent`.
- [x] **P0:** Assign badge colors for each level.
- [x] **P0:** Define severity meaning for pitch/demo.

## 3.4 Status Values

- [x] **P0:** Define status values: `New`, `Reported`, `In progress`, `Resolved`.
- [x] **P0:** Assign status badge colors.
- [ ] **P1:** Allow status updates from UI.

## 3.5 Demo Data

- [x] **P0:** Create 3 demo issues.
- [x] **P0:** Add realistic Kolkata locations.
- [x] **P0:** Add map coordinates for each demo issue.
- [x] **P0:** Add believable complaint messages.
- [x] **P0:** Add varied categories and severity levels.
- [x] **P1:** Add 5 demo issues for richer map.

---

# Phase 4: UI Components

## 4.1 App Layout

- [ ] **P0:** Create top navigation.
- [ ] **P0:** Add logo text: `ParaPulse`.
- [ ] **P0:** Add nav links: `Report`, `Map`, `Demo`.
- [ ] **P0:** Create responsive container.
- [ ] **P0:** Add footer with theme text: `Built for community action`.

## 4.2 Landing Page

- [ ] **P0:** Create hero section.
- [ ] **P0:** Add headline explaining product.
- [ ] **P0:** Add short problem statement.
- [ ] **P0:** Add CTA button: `Report an Issue`.
- [ ] **P0:** Add secondary CTA: `View Community Map`.
- [ ] **P1:** Add “How it works” section.
- [ ] **P1:** Add three steps: upload, analyze, act.
- [ ] **P1:** Add sample issue cards.
- [ ] **P1:** Add impact metrics placeholder.

## 4.3 Report Issue Form

- [ ] **P0:** Create text description textarea.
- [ ] **P0:** Create location input.
- [ ] **P0:** Create image upload input.
- [ ] **P0:** Show uploaded image preview.
- [ ] **P0:** Add generate button.
- [ ] **P0:** Disable generate button when required fields are empty.
- [ ] **P0:** Show loading state while AI runs.
- [ ] **P0:** Show error state if AI fails.
- [ ] **P1:** Add example-fill button for demo.
- [ ] **P1:** Add clear form button.

## 4.4 Generated Issue Card

- [ ] **P0:** Show generated title.
- [ ] **P0:** Show category badge.
- [ ] **P0:** Show severity badge.
- [ ] **P0:** Show location.
- [ ] **P0:** Show AI summary.
- [ ] **P0:** Show suggested authority.
- [ ] **P0:** Show missing information list.
- [ ] **P0:** Show complaint message.
- [ ] **P0:** Show volunteer action.
- [ ] **P0:** Add copy complaint button.
- [ ] **P0:** Add save report button.
- [ ] **P1:** Allow editing generated fields before saving.
- [ ] **P1:** Add share text button.

## 4.5 Community Map Page

- [ ] **P0:** Render Leaflet map.
- [ ] **P0:** Center map on Kolkata.
- [ ] **P0:** Add OpenStreetMap tile layer.
- [ ] **P0:** Add markers for demo issues.
- [ ] **P0:** Add marker popup with title, severity, and location.
- [ ] **P0:** Add sidebar list of issues.
- [ ] **P1:** Add category filter.
- [ ] **P1:** Add severity filter.
- [ ] **P1:** Add status filter.
- [ ] **P1:** Add different marker colors by severity.

## 4.6 Issue Detail View

- [ ] **P1:** Create modal or detail panel for selected issue.
- [ ] **P1:** Show full issue information.
- [ ] **P1:** Show complaint message with copy button.
- [ ] **P1:** Add status dropdown.
- [ ] **P2:** Add timeline of status updates.

---

# Phase 5: AI Integration

## 5.1 Choose AI Provider

- [ ] **P0:** Choose Gemini or OpenAI.
- [ ] **P0:** Confirm model supports required input.
- [ ] **P0:** Confirm API key is available.
- [ ] **P0:** Confirm request works locally.

## 5.2 AI Prompt Design

- [ ] **P0:** Write system instruction: AI acts as a civic issue analyst.
- [ ] **P0:** Tell AI to classify issue category.
- [ ] **P0:** Tell AI to estimate severity.
- [ ] **P0:** Tell AI to generate concise formal summary.
- [ ] **P0:** Tell AI to suggest likely authority.
- [ ] **P0:** Tell AI to list missing information.
- [ ] **P0:** Tell AI to generate complaint message.
- [ ] **P0:** Tell AI to generate volunteer action suggestion.
- [ ] **P0:** Tell AI to return strict JSON only.
- [ ] **P0:** Tell AI to avoid making unsupported claims.
- [ ] **P0:** Tell AI to mention uncertainty if input is unclear.

## 5.3 JSON Output Handling

- [ ] **P0:** Define expected JSON schema.
- [ ] **P0:** Parse AI response safely.
- [ ] **P0:** Validate required fields.
- [ ] **P0:** Add fallback values for missing fields.
- [ ] **P0:** Show friendly error if response cannot be parsed.
- [ ] **P1:** Add retry button.

## 5.4 Text Input Analysis

- [ ] **P0:** Send text description and location to AI.
- [ ] **P0:** Receive structured civic issue JSON.
- [ ] **P0:** Render output in issue card.
- [ ] **P0:** Test with waterlogging example.
- [ ] **P0:** Test with garbage example.
- [ ] **P0:** Test with broken streetlight example.

## 5.5 Image Input Analysis

- [ ] **P1:** Convert uploaded image to base64 if provider requires it.
- [ ] **P1:** Send image and text to vision-capable model.
- [ ] **P1:** Ask AI to use image only as supporting evidence.
- [ ] **P1:** Handle image too large error.
- [ ] **P1:** Compress image if needed.
- [ ] **P2:** Extract visual evidence from image.

## 5.6 AI Fallback Mode

- [ ] **P0:** Create fallback report generator for demo safety.
- [ ] **P0:** If API fails, generate structured output from local template.
- [ ] **P0:** Make fallback output realistic.
- [ ] **P0:** Add visible message only if needed.
- [ ] **P0:** Test demo with API disabled.

---

# Phase 6: Storage and State

## 6.1 Fast MVP Storage

- [ ] **P0:** Store issue list in React state.
- [ ] **P0:** Save issue list to LocalStorage.
- [ ] **P0:** Load saved issues on app startup.
- [ ] **P0:** Load demo issues if no saved issues exist.
- [ ] **P0:** Add generated issue to issue list after save.
- [ ] **P0:** Persist status changes.

## 6.2 Supabase Storage

- [ ] **P1:** Create Supabase project.
- [ ] **P1:** Create `issues` table.
- [ ] **P1:** Add columns matching issue data model.
- [ ] **P1:** Create insert function.
- [ ] **P1:** Create fetch function.
- [ ] **P1:** Create update status function.
- [ ] **P1:** Add Supabase environment variables.
- [ ] **P2:** Add Supabase Storage bucket for issue images.
- [ ] **P2:** Upload images to bucket.

---

# Phase 7: Map and Location

## 7.1 Default Map Setup

- [ ] **P0:** Set default center to Kolkata.
- [ ] **P0:** Set useful zoom level.
- [ ] **P0:** Confirm map tiles load.
- [ ] **P0:** Fix Leaflet marker icon issue if markers do not appear.

## 7.2 Location Handling

- [ ] **P0:** For MVP, use predefined coordinates for demo locations.
- [ ] **P0:** Assign default Kolkata coordinate if user location is text-only.
- [ ] **P1:** Add simple location-to-coordinate mapping for known demo locations.
- [ ] **P2:** Add geocoding API later.
- [ ] **P2:** Add browser geolocation later.

## 7.3 Marker Experience

- [ ] **P0:** Show issue markers.
- [ ] **P0:** Show popup on marker click.
- [ ] **P0:** Include title, category, severity, and status in popup.
- [ ] **P1:** Use marker color based on severity.
- [ ] **P1:** Open selected issue detail from popup.

---

# Phase 8: Copy, Share, and Export

## 8.1 Copy Complaint

- [ ] **P0:** Add copy button near complaint message.
- [ ] **P0:** Use Clipboard API.
- [ ] **P0:** Show success feedback after copy.
- [ ] **P0:** Handle clipboard failure gracefully.

## 8.2 Share Message

- [ ] **P1:** Generate WhatsApp-friendly message.
- [ ] **P1:** Include issue title, location, severity, and complaint.
- [ ] **P1:** Add `Share on WhatsApp` link.
- [ ] **P2:** Add downloadable Markdown report.

---

# Phase 9: Demo Readiness

## 9.1 Demo Data

- [ ] **P0:** Add waterlogging demo issue.
- [ ] **P0:** Add garbage demo issue.
- [ ] **P0:** Add broken streetlight demo issue.
- [ ] **P1:** Add open drain demo issue.
- [ ] **P1:** Add damaged footpath demo issue.

## 9.2 Demo Flow

- [ ] **P0:** Test complete flow from landing to report form.
- [ ] **P0:** Test AI generation.
- [ ] **P0:** Test saving report.
- [ ] **P0:** Test report appearing on map.
- [ ] **P0:** Test copy complaint button.
- [ ] **P0:** Test fallback mode.
- [ ] **P0:** Test on deployed URL or local server.

## 9.3 Pitch Preparation

- [ ] **P0:** Memorize one-line summary.
- [ ] **P0:** Memorize problem statement.
- [ ] **P0:** Memorize demo story.
- [ ] **P0:** Prepare answer for “Why AI?”
- [ ] **P0:** Prepare answer for “How is this community-focused?”
- [ ] **P0:** Prepare answer for “What did you build?”
- [ ] **P1:** Prepare answer for “How do you prevent fake reports?”
- [ ] **P1:** Prepare answer for “How will this scale?”

---

# Phase 10: UI Polish

## 10.1 Visual Design

- [ ] **P0:** Use clean civic-tech color palette.
- [ ] **P0:** Make severity visually obvious.
- [ ] **P0:** Keep cards readable.
- [ ] **P0:** Ensure important actions are visible.
- [ ] **P1:** Add icons for civic issue categories.
- [ ] **P1:** Add subtle animations.
- [ ] **P1:** Add empty states.

## 10.2 Mobile Responsiveness

- [ ] **P0:** Test on narrow screen.
- [ ] **P0:** Ensure report form is usable on mobile.
- [ ] **P0:** Ensure map page does not break on mobile.
- [ ] **P1:** Stack map and issue list on small screens.

## 10.3 Error and Loading States

- [ ] **P0:** Show AI loading state.
- [ ] **P0:** Show save success state.
- [ ] **P0:** Show copy success state.
- [ ] **P0:** Show map loading fallback.
- [ ] **P1:** Add toast notifications.

---

# Phase 11: Deployment

## 11.1 Build Check

- [ ] **P0:** Run production build.
- [ ] **P0:** Fix build errors.
- [ ] **P0:** Check console errors.
- [ ] **P0:** Verify environment variables.

## 11.2 Deploy

- [ ] **P0:** Deploy to Vercel or Netlify.
- [ ] **P0:** Add AI API key in deployment environment settings.
- [ ] **P0:** Test deployed app.
- [ ] **P0:** Confirm AI works in deployed app.
- [ ] **P0:** Confirm map loads in deployed app.
- [ ] **P0:** Keep local backup ready.

## 11.3 README

- [ ] **P0:** Add project title.
- [ ] **P0:** Add short description.
- [ ] **P0:** Add problem statement.
- [ ] **P0:** Add solution overview.
- [ ] **P0:** Add tech stack.
- [ ] **P0:** Add AI usage explanation.
- [ ] **P0:** Add setup instructions.
- [ ] **P0:** Add demo flow.
- [ ] **P1:** Add screenshots.
- [ ] **P1:** Add future scope.

---

# Phase 12: Future Scope

## 12.1 Product Enhancements

- [ ] **P2:** Add user authentication.
- [ ] **P2:** Add role-based volunteer dashboard.
- [ ] **P2:** Add ward-level analytics.
- [ ] **P2:** Add duplicate issue clustering.
- [ ] **P2:** Add report verification by multiple users.
- [ ] **P2:** Add trust score for reporters.

## 12.2 AI Enhancements

- [ ] **P2:** Add Bengali report generation.
- [ ] **P2:** Add Hindi report generation.
- [ ] **P2:** Add voice input.
- [ ] **P2:** Add OCR from complaint screenshots.
- [ ] **P2:** Add automatic authority mapping by location.
- [ ] **P2:** Add issue trend summaries.

## 12.3 Civic Integration

- [ ] **P2:** Add authority directory.
- [ ] **P2:** Add email generation for departments.
- [ ] **P2:** Add official complaint portal links.
- [ ] **P2:** Add escalation history.
- [ ] **P2:** Add NGO/RWA workspace mode.

---

# 2-Hour Critical Path

If there are only 2 hours, complete only this list:

- [ ] Create app.
- [ ] Add Tailwind.
- [ ] Build landing page.
- [ ] Build report form with text and location.
- [ ] Build generated issue card.
- [ ] Add AI text analysis or fallback generator.
- [ ] Add save to LocalStorage.
- [ ] Add map with demo issue pins.
- [ ] Add copy complaint button.
- [ ] Prepare waterlogging demo.
- [ ] Test full flow once.
- [ ] Prepare 1-minute pitch.

---

# Must-Have Demo Acceptance Criteria

The project is demo-ready when:

- [ ] A user can open the app and understand the purpose in 10 seconds.
- [ ] A user can enter a civic issue description and location.
- [ ] The app can generate a structured civic report.
- [ ] The report includes category, severity, summary, authority, and complaint message.
- [ ] The user can save the report.
- [ ] The saved report appears on a map.
- [ ] The user can copy the complaint message.
- [ ] The demo works even if the AI API fails.

---

# Final Build Order

1. Build layout.
2. Build report form.
3. Build static generated card.
4. Add fallback AI output.
5. Add real AI call.
6. Add save flow.
7. Add map.
8. Add copy button.
9. Add polish.
10. Deploy.
