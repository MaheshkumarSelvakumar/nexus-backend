# NEXUS Backend — REST API

Express.js REST API for NEXUS — a gamified learning quest tracker.
Handles authentication, quest management and database operations.

## Tech Stack
- Node.js + Express
- JWT Authentication + bcrypt
- Prisma ORM
- PostgreSQL via Supabase
- Morgan for request logging
- Deployed on Render

## API Endpoints

### Authentication
POST /api/auth/register   — create new account
POST /api/auth/login      — login and receive JWT token
GET  /api/auth/me         — get current user (protected)

### Quests — all routes require JWT token
GET    /api/quests         — get all quests for logged in user
POST   /api/quests         — create a new quest
PATCH  /api/quests/:id     — update quest status
DELETE /api/quests/:id     — delete a quest

## Database Schema
```prisma
model User {
  id         Int      @id @default(autoincrement())
  email      String   @unique
  password   String
  name       String
  profession String
  xp         Int      @default(0)
  createdAt  DateTime @default(now())
  quests     Quest[]
}

model Quest {
  id         Int      @id @default(autoincrement())
  title      String
  subject    String
  difficulty String
  status     String   @default("todo")
  createdAt  DateTime @default(now())
  userId     Int
  user       User     @relation(fields: [userId], references: [id])
}
```

## Local Setup
```bash
git clone https://github.com/MaheshkumarSelvakumar/nexus-backend.git
cd nexus-backend
npm install
```

Create `.env`:
PORT=5000
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

```bash
npx prisma db push
npm run dev
```

## Author
**Maheshkumar Selvakumar** — Software Engineer at TCS

- Portfolio: [maheshkumarselvakumar.github.io/portfolio](https://maheshkumarselvakumar.github.io/portfolio/)
- LinkedIn: [linkedin.com/in/maheshkumar-selvakumar-730208403](https://www.linkedin.com/in/maheshkumar-selvakumar-730208403/)
- GitHub: [github.com/MaheshkumarSelvakumar](https://github.com/MaheshkumarSelvakumar)