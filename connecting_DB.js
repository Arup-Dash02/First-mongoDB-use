const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://ArupDash:Dash%40232001@cluster0.lboqeij.mongodb.net/userappnew"
);
const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

// const user = new User({
//   name: "Arup  Dash",
//   email: "arupdash2022@gmail.com",
//   password: "Dash@232001",
// });
// user.save();

//to do the above things dynamically we have to create a post request where ehenever a user signup the data will be sored in our database

app.use(express.json());//This line is most imp please understand it throughly and carefully

app.post("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  //at first we have to check is the user already exist
  const existingUser = await User.findOne({ email: username });
  if (existingUser) {
    return res.status(400).send("username is already exist.");
  }

  const user = new User({
    name: name,
    email: username,
    password: password,
  });
  user.save();

  res.json({
    msg: "user created successfully",
  });
});

app.listen(3000, function () {
  console.log("Your app is running on port 3000");
});
