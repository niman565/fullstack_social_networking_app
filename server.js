const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

// DB config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(
    db,
    //option to use new url parser as just using 'db' as sole argument will result in a DeprecationWarning saying that the current string parser is deprecated and will be removed in a future version
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
