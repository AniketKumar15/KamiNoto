
# 📝 KamiNoto - Personal Note-Taking App

KamiNoto is a full-stack MERN note-taking web app designed to make your notes organized, searchable, and easy to manage.

## 🚀 Features

- User authentication (signup, login, JWT)
- Create, edit, delete notes
- Pin / unpin notes
- Tags with color coding
- Dashboard with:
  - Total notes count
  - Pinned notes
  - Unique tags
  - Quick access folders
  - Top 3 pinned notes
  - Recently added notes
  - Top used tags
- Profile update page
- Alerts with animations
- Responsive design for mobile and desktop

## 🛠️ Tech Stack

- React.js + Tailwind CSS (frontend)
- Node.js + Express + MongoDB + Mongoose (backend)
- JWT authentication
- Lucide Icons
- React Router

## 📂 Project Structure

```
/Frontend      → frontend (React)
/BackEnd      → backend (Node, Express)
```

## ⚙️ Setup

### Backend

```bash
cd BackEnd
npm install
npm run dev
```
Add a `.env` file in `/BackEnd`:

```
MONGODB_URI=your_mongo_connection_string
DB_NAME = your_db_name
PORT=your_port
JWT_TOKEN_SECRET = your_jwt_secret
```
### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## 🌟 Coming soon

- Folder system
- Profile picture upload
- Search & filters
- Note sharing
- Trash/Archive support

## 🤝 Contributing

PRs and ideas are welcome!

---

Made with ❤️ by Aniket Kumar
