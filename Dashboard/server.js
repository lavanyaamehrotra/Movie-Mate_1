const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname)));

const USERS = [
  { username: "admin", password: "admin123" },
  { username: "lavanyamehrotra74@gmail.com", password: "123" },
  { username: "parth@gmail.com", password: "456" },
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login_page.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(user => user.username === username && user.password === password);
  if (user) {
    res.json({ success: true, redirect: "/index.html" });
  } else {
    res.json({ success: false, message: "Invalid username or password." });
  }
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); 
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
