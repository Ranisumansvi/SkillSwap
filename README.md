# SkillSwap 🎓

SkillSwap is a full-stack student skill exchange platform where students can teach the skills they know and learn the skills they want.

Instead of traditional learning platforms, SkillSwap focuses on **peer-to-peer skill exchange**.

For example:

- Anu can teach Java and wants to learn React.
- Sakhi can teach React and wants to learn Java.
- SkillSwap identifies them as a potential skill exchange match.

---

## 🚀 Features

- 🔐 Student Registration and Login
- 🔑 JWT-based Authentication
- 🔒 Password Hashing using bcrypt
- 👤 Student Profile
- 📚 Add Teaching Skills
- 🎯 Add Learning Skills
- 🔎 Explore Skill Matches
- 🤝 Skill Exchange Matching
- 📩 Send Exchange Requests
- ✅ Accept or Reject Requests
- 📊 Student Dashboard
- 💾 MySQL Database
- 🌐 REST API

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Authentication
- JSON Web Tokens (JWT)
- bcryptjs

### Development Tools
- Visual Studio Code
- MySQL Workbench
- Git
- GitHub

---

## 🏗️ Project Structure

```text
SkillSwap/
│
├── client/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── skills.html
│   ├── matches.html
│   ├── requests.html
│   ├── profile.html
│   │
│   ├── css/
│   │   └── ...
│   │
│   └── js/
│       └── ...
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md