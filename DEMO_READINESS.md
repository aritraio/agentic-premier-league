# ParaPulse Demo Readiness

## One-line summary

ParaPulse turns community complaints into structured, shareable civic reports in seconds.

## Problem statement

Residents often notice civic issues such as waterlogging, garbage piles, broken streetlights, open drains, and damaged footpaths, but reporting them is slow and unclear. People may not know how to describe the problem, which authority to contact, or what details are needed for action.

## Demo story

A volunteer sees severe waterlogging near the Salt Lake Sector V bus stop after heavy rain. Instead of writing a complaint from scratch, they open ParaPulse, use the demo example, generate a structured report, save it, and confirm it appears on the community map. They can then copy the complaint, share it on WhatsApp, or download a Markdown report.

## Demo flow

1. Start on the landing page and explain the promise: complaints become actionable reports.
2. Open the report form.
3. Click `Use demo example` for the Salt Lake Sector V waterlogging scenario.
4. Click `Generate report` and wait for the structured issue card.
5. Show category, severity, suggested authority, missing info, complaint text, and volunteer action.
6. Click `Save report`.
7. Use `View on map` to show the saved issue on the community map.
8. Open the generated report again and demonstrate copy, WhatsApp share, and Markdown export.
9. Mention that if the AI API key is unavailable, ParaPulse uses a local fallback so the demo still works.

## Demo data to show

- **Waterlogging:** Near Salt Lake Sector V bus stop, Kolkata.
- **Garbage:** Near Gariahat market, Kolkata.
- **Broken streetlight:** Near Jadavpur 8B bus stand, Kolkata.
- **Open drain:** Park Circus seven-point crossing, Kolkata.
- **Damaged footpath:** Dhakuria bridge approach, Kolkata.

## Answer: Why AI?

AI helps transform messy, incomplete resident descriptions into clear civic reports. It classifies the issue, estimates severity, drafts a complaint message, suggests the relevant authority, and identifies missing information that volunteers can collect.

## Answer: How is this community-focused?

ParaPulse is designed for residents, students, RWAs, NGOs, and local volunteer groups. It helps communities coordinate evidence, share reports, follow up with authorities, and keep a visible map of issues that need attention.

## Answer: What did you build?

We built a React-based civic reporting MVP with a landing page, report form, AI-assisted issue generation, local fallback generation, local persistence, a community map, status updates, copy/share actions, and seeded Kolkata demo issues.

## Answer: How do you prevent fake reports?

The MVP encourages evidence-based reporting with photos, specific landmarks, missing-info prompts, and community review. Future versions can add phone/email verification, duplicate detection, reputation signals, moderation queues, and authority feedback loops.

## Answer: How will this scale?

The current MVP stores data locally for the hackathon demo. It can scale by moving reports to a hosted database, adding role-based dashboards for volunteer groups and authorities, integrating geocoding, adding verification workflows, and connecting to official complaint portals where available.

## Fallback demo plan

If the AI key or network is unavailable, continue the demo normally. The app catches AI generation failure and uses local rule-based generation, so the form still creates a complete civic issue with category, severity, authority, complaint text, and volunteer action.
