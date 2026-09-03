# Lead Manager

A simple full-stack lead management application. Add leads and view them in a list, backed by a REST API and a PostgreSQL database.

## Tech Stack

- **Backend:** Node.js, Express, Prisma ORM
- **Database:** PostgreSQL (Supabase)
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS

## Project Structure

## Project Structure

​```
lead-manager/
├── backend/     # Express REST API + Prisma
└── frontend/    # Next.js UI
​```


## Prerequisites

- Node.js 18+ and npm
- A PostgreSQL database (this project uses Supabase)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd lead-manager
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
# Pooled connection (used by the app at runtime)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true"

# Direct connection (used by Prisma for migrations)
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"

PORT=5000
```

Generate the Prisma client and apply the database schema:

```bash
npx prisma generate
npx prisma migrate deploy
```

Start the backend:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| GET    | `/leads`  | Fetch all leads    |
| POST   | `/leads`  | Create a new lead  |

### Lead schema

| Field       | Type      | Notes                                                          |
| ----------- | --------- | -------------------------------------------------------------- |
| `id`        | string    | UUID, auto-generated                                           |
| `name`      | string    | Required                                                       |
| `email`     | string    | Required, unique                                               |
| `status`    | enum      | `New`, `Engaged`, `ProposalSent`, `ClosedWon`, `ClosedLost`   |
| `createdAt` | timestamp | Auto-generated                                                 |

### Example: create a lead

```bash
curl -X POST http://localhost:5000/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","status":"New"}'
```

## Notes

- Status values are stored without spaces (e.g. `ProposalSent`) as valid enum identifiers, and mapped to display labels (e.g. "Proposal Sent") in the UI.
- The email field has a unique constraint; attempting to add a duplicate returns a `409 Conflict` with a descriptive message.
- The Prisma client is generated into `backend/src/generated/` and is not committed — run `npx prisma generate` after installing.