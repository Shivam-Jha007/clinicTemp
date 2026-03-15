# Clinic Appointment Website Template

A modern, responsive, lightweight clinic website template for freelance client demos.

This project is built with plain HTML, CSS, and vanilla JavaScript, with Supabase used for appointment storage and admin data viewing.

## Highlights

- Multi-page clinic website
- Online appointment booking form with validation
- Supabase integration for creating and listing appointments
- Admin dashboard table with Today filter
- Admin password gate on the front end
- Mobile responsive UI with clean medical-style design

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend and Database: Supabase
- Deployment: Netlify or Vercel
- External integration: Google Maps Embed

## Folder Structure

```text
clinic-website/
  index.html
  services.html
  book.html
  contact.html
  admin.html
  css/
    style.css
  js/
    main.js
    booking.js
    supabaseClient.js
    admin.js
  assets/
    images/
  supabase-schema.sql
  README.md
```

## Page Overview

- Home page: hero, doctor intro, services preview, timings, CTA
- Services page: service cards with descriptions and pricing
- Booking page: appointment form and submission feedback
- Contact page: clinic details, map embed, WhatsApp contact button
- Admin page: appointment records table and Today-only toggle

## JavaScript Module Responsibilities

- js/main.js
  - navigation interactions
  - active nav state
  - shared UI behavior
- js/booking.js
  - booking form validation
  - submit appointment data to Supabase
  - loading and success or error messaging
- js/supabaseClient.js
  - initialize Supabase client
  - create appointment records
  - fetch appointment records
- js/admin.js
  - admin password gate logic
  - fetch and render appointments table
  - Today filter logic

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL Editor in Supabase.
3. Run the SQL from supabase-schema.sql.
4. Copy js/config.example.js to js/config.js.
5. Open js/config.js and update:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
6. Confirm the appointments table exists in your database.

## Security Before Deploy

1. Never commit private keys (service role keys, personal tokens, SMTP secrets).
2. Keep only public client config in frontend code (Supabase anon key is public by design).
3. If a real key was committed or pushed before, rotate it immediately in Supabase.
4. This repo includes .gitignore entries for local secret files and .env files.
5. Use hosting platform environment variables for real secrets in server-side functions only.

Important:
- In static frontend apps, keys shipped to the browser are visible to users.
- Do not place service role keys in this project frontend files.

## Database Schema

Table name: appointments

Columns:
- id (auto generated primary key)
- name
- phone
- email
- date
- time
- reason
- created_at (timestamp)

## Admin Access

- Admin page is protected by a simple front-end password gate.
- Password: clinic123
- If password is incorrect, appointment data is not fetched.

Important: this is basic client-side gating and not true security. For production security, use Supabase Auth plus Row Level Security policies.

## Local Development

You can run this project with any static server.

Example using Node:

```bash
npx serve .
```

Then open pages from the clinic-website folder in your browser.

## Deployment

### Netlify

1. Create a new site from your project.
2. Set publish directory to clinic-website.
3. Deploy.

### Vercel

1. Import your repository.
2. Set Root Directory to clinic-website.
3. Deploy.

## Notes

- Keep only public Supabase client config in js/config.js.
- js/config.js is ignored by git; js/config.example.js is the committed template.
- Optimize and replace stock images in assets/images for client delivery.
- If needed, add branding colors and logo to match clinic identity.
