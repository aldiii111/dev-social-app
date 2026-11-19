# DevConnect

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

DevConnect is a full-stack web project I built to practice building end-to-end applications from scratch.

The idea is simple: a space where developers can share side-project ideas and find collaboration partners based on specific roles (Frontend, Backend, UI/UX, etc.) and the tech stack used.

> ⚠️ **Note:** This project is still under active development and improvement.

🔗 **Live Demo:** [devconnect-tan-gamma.vercel.app](https://devconnect-tan-gamma.vercel.app/)  
> *Note on Demo: The backend is hosted on Render's free tier. If the server is in sleep mode (idle), the initial request takes around 30–50 seconds to spin up.*

---

## Why I Built This Project

The main goal of this project was to deepen my understanding of real-world full-stack workflows beyond simple CRUD tutorials.

Many junior and mid-level developers have great side-project ideas but struggle to find partners with complementary skills (e.g., a frontend developer needing a backend partner). I created DevConnect to address that need: a platform focused on specific roles and tech stacks.

Through this project, I wanted to learn hands-on how to:
- Build a custom authentication flow from scratch.
- Manage PostgreSQL database relationships using an ORM.
- Connect a client-side app (Vite/React) with a REST API (Express).
- Troubleshoot real-world technical issues that only surface after deploying to production.

---

## Tech Stack I Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Radix UI, Axios
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Security:** JSON Web Token (JWT) & Bcrypt
- **Deployment & Tooling:** Vercel (Frontend), Render (Backend), Docker Compose

---

## Features

- **Account Authentication:** User registration and login using email & password. Passwords are hashed using bcrypt, and user sessions are managed with JWT.
- **Project Collaboration Posts:** Create project posts, specify the roles needed (Frontend, Backend, DevOps, etc.), and add relevant tech stack tags.
- **Project Feed:** Browse active project posts looking for teammates from other developers.
- **User Profile:** View account summary and a list of created projects along with a GitHub link.
- **Auto Logout / Interceptor:** If the token expires, the application automatically redirects the user back to the login page.

---

## What I Learned From This Project

Here are some real-world challenges I ran into while building this and how I solved them:

### 1. Handling Cold Starts on a Free-Tier Server
When I first deployed the backend to Render (free tier), the server automatically spun down into sleep mode whenever there was no traffic. The issue was that the initial request from the frontend often failed because Axios's default timeout was too short (~5 seconds), making users think the app was broken.
- **Solution:** I set Axios's timeout to 60 seconds (`timeout: 60000`) and made sure the UI showed a clear loading state so users knew the server was just spinning up.

### 2. 404 Errors When Refreshing on Vercel (SPA Routing)
The app worked completely fine when navigating around using links or buttons. But whenever I refreshed a page like `/login` or `/feed`, Vercel immediately threw a 404 error.
- **Solution:** I learned that static web servers look for physical files matching the URL path. In a Single Page Application (SPA), routing is handled on the client side by React Router. I solved this by adding rewrite rules in `vercel.json` to route all incoming requests back to `index.html`.

### 3. Building an Authentication Pipeline from Scratch
Initially, I tried logging in with Google OAuth, but I decided to refactor it into a custom email & password system.
- **Why & What I Learned:** I wanted to truly understand the authentication lifecycle from the ground up: how to securely hash passwords with bcrypt, create stateless JWT tokens, store tokens on the client, and build custom Express middleware to protect private API routes.

### 4. Modeling Relational Data with Prisma ORM
This app required clear data relationships between users, project posts, and required tech stack tags.
- **What I Learned:** I learned how to model one-to-many relationships in Prisma, use database enums for role categories, and configure `onDelete: Cascade`. With cascade deletes, deleting a post automatically removes its associated tech tags, keeping the database clean without orphan records.

### 5. Containerizing the App with Docker
Setting up PostgreSQL locally on different development machines often resulted in mismatched versions and configuration conflicts.
- **What I Learned:** I created Dockerfiles for both backend and frontend, then tied them together with PostgreSQL using `docker-compose.yml`. Now, the entire project can be spun up on any machine with a single command without needing PostgreSQL installed directly on the host OS.

---

## Running the Project Locally

### Option 1: Using Docker Compose (Recommended)
If you have Docker installed:

```bash
git clone https://github.com/aldiii111/dev-social-app.git
cd dev-social-app

# Run all services together
docker compose up --build
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

### Option 2: Running Manually (pnpm)

#### 1. Backend Setup
```bash
cd server
pnpm install

# Create environment file
cp .env.example .env

# Push Prisma schema to your local PostgreSQL database
pnpm prisma db push

# Start backend
pnpm dev
```

#### 2. Frontend Setup
Open a new terminal tab:
```bash
cd client
pnpm install

# Create environment file
cp .env.example .env

# Start frontend
pnpm dev
```

---

## Environment Variables Configuration

**`server/.env`**
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/devsocial?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/devsocial?schema=public"
JWT_SECRET="your_custom_jwt_secret"
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:3000
```
