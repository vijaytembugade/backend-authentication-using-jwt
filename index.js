const express = require("express");
const { dummyUserData } = require("./dummyData");
const jwt = require("jsonwebtoken");
const tokenValidator = require("./tokenVerifyMiddleware");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createToken = (email) => {
  return jwt.sign({ email }, "vijay", { expiresIn: "1d" });
};

app.get("/", (req, res) => {
  res.json({ name: "hello world" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(400).json({ message: "Please provide email and password" });
  }
  try {
    const user = dummyUserData.find((user) => user.email === email);

    if (!user) {
      throw Error("User not found");
    }
    const token = createToken(user.email);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.use(tokenValidator);

app.get("/get-user-details", (req, res) => {
  const { email } = req;
  const user = dummyUserData.find((user) => user.email === email);
  console.log(user);
  if (!user) {
    res.status(401).json({ message: "User not found" });
  }
  res.status(200).json({ user });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
