\# Hope Inc. SMS — Presentation Slides Outline



\## Slide 1 — Title

\*\*Hope Inc. Sales Management System\*\*

New Era University — BS Information Technology

Team Members: JanreyMaranan, IsaiahLynelPineda, CarlWilliamPaming, bernardlorenzo, kenthairhonguinto



\## Slide 2 — Project Overview

\- Web-based Sales Management System for Hope Inc.

\- Built with React + Vite + Tailwind CSS + Supabase

\- 5-member team, 3 sprints, 57 total PRs



\## Slide 3 — System Architecture

\- Frontend: React + Vite + Tailwind CSS

\- Backend: Supabase (PostgreSQL + Auth + RLS)

\- Deployment: Vercel

\- Version Control: GitHub (feature branch workflow)



\## Slide 4 — Database Design

\- 6 core tables: sales, salesDetail, customer, employee, product, pricehist

\- 2 auth tables: user, UserModule\_Rights

\- Row Level Security on all tables

\- Cascade soft-delete trigger



\## Slide 5 — Key Features

\- Email/password + Google OAuth login

\- Role-based access: USER, ADMIN, SUPERADMIN

\- 13 granular rights per user

\- Soft-delete and recovery system

\- 3 report views: Sales by Customer, Top Products, Monthly Trend



\## Slide 6 — Sprint Summary

| Sprint | Focus | PRs |

|--------|-------|-----|

| Sprint 1 | Setup, Auth, Schema | 18 PRs |

| Sprint 2 | CRUD, RLS, Rights | 23 PRs |

| Sprint 3 | Reports, Admin, Deploy | 16 PRs |



\## Slide 7 — Live Demo

\- Login as USER → show limited access

\- Login as ADMIN → show full CRUD

\- Login as SUPERADMIN → show admin panel



\## Slide 8 — Conclusion

\- All features implemented and tested

\- 39 test cases passing

\- App deployed and live on Vercel

\- Thank you!

