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
4. Open js/supabaseClient.js and update:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
5. Confirm the appointments table exists in your database.

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

- Keep Supabase keys in js/supabaseClient.js for this template setup.
- Optimize and replace stock images in assets/images for client delivery.
- If needed, add branding colors and logo to match clinic identity.
