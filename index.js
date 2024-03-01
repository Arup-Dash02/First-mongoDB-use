const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: "arupdash2022@gmail.com",
    password: "232001",
    name: "Arup Dash",
  },
  {
    username: "asishdah03@gmail.com",
    password: "123",
    name: "Asish Dash",
  },
  {
    username: "abinashdash23@gmail.com",
    password: "2323",
    name: "Abinash Dash",
  },
];

function userExists(username, password) {
  //to do
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (
      username == ALL_USERS[i].username &&
      password == ALL_USERS[i].password
    ) {
      return true;
    } else {
      return false;
    }
  }
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User does not exist in our in memory db.",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    //return a list of users other than this username
    //understand about filter very useful function
    res.json({
      user: ALL_USERS.filter(function (value) {
        if (value.username == username) {
          return false;
        } else {
          return true;
        }
      }),
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000, function () {
  console.log("Your app is running on port 3000.");
});
