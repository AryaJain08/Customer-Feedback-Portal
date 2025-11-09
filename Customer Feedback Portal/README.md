# Customer Feedback Portal (Full Stack)

A full-stack MERN app demonstrating authentication, protected routes, and a simple feedback workflow
with user and admin roles.

## Tech
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Frontend**: React (Vite), React Router, Axios
- **Auth**: Email/Password with JWT (localStorage on client)

## Run locally

### 1) Backend
```bash
cd backend
cp .env.sample .env   # edit values if needed
npm install
npm run dev           # starts on http://localhost:5000
```

### 2) Frontend
```bash
cd ../frontend
npm install
# Optionally set API url: create .env file with VITE_API_URL="http://localhost:5000/api"
npm run dev           # starts on http://localhost:5173
```

### 3) Create an admin user (optional)
Edit POST /api/auth/signup body to include `"role":"admin"` to create an admin.

### API Overview
- `POST /api/auth/signup` – create account `{ name, email, password, role? }`
- `POST /api/auth/login` – login `{ email, password }`
- `GET /api/auth/me` – get current user (requires Bearer token)
- `POST /api/feedback` – submit feedback `{ title, message, rating }` (auth)
- `GET /api/feedback/mine` – list own feedback (auth)
- `DELETE /api/feedback/:id` – delete own item (auth)
- `GET /api/feedback` – list all feedback (admin)
- `PATCH /api/feedback/:id/status` – update status (admin)

## Folder structure (as required)
```
fullstack-auth-app/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env.sample
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Feedback.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── feedbackRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── feedbackController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── utils/
│       └── generateToken.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── styles.css
│       ├── components/
│       │   └── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── Signup.jsx
│       │   ├── Login.jsx
│       │   └── Home.jsx
│       ├── services/
│       │   └── api.js
│       └── context/
│           └── AuthContext.jsx
├── README.md
└── .gitignore
```

## Notes
- Make sure MongoDB is running locally: `mongodb://127.0.0.1:27017/customer_feedback_portal`.
- Update `CLIENT_ORIGIN` in backend `.env` if your frontend runs elsewhere.
- Styling is kept sleek with a dark, professional palette.
