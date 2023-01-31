const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Chat = require("./models/Chats.js");
const User = require("./models/User.js");

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.k6dtjvx.mongodb.net/?retryWrites=true&w=majority",
    {
      // useNewUrlParser:true,
      // useCreateIndex:true,
      // useUnifiedTopology:true
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Connection unable to open");
    console.log(err);
  });

mongoose.set("strictQuery", true);

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));

async function initpop() {
  await db.users.insertMany(
    {
      id_no: 1,
      messages: [
        "First chat of employee 1",
        "Second chat of employee 1",
        "Third chat of employee 1",
        "Fourth chat of employee 1",
        "Fifth chat of employee 1",
      ],
      rating10: 0,
      rating90: 0,
      x10: 0,
      x90: 0,
      image:
        "https://ui-avatars.com/api/?name=Rubina Rastogi&background=random",
    },
    {
      id_no: 2,
      messages: [
        "First chat of employee 2",
        "Second chat of employee 2",
        "Third chat of employee 2",
        "Fourth chat of employee 2",
        "Fifth chat of employee 2",
      ],
      rating10: 0,
      rating90: 0,
      x10: 0,
      x90: 0,
      image: "https://ui-avatars.com/api/?name=Naina Jindal&background=random",
    },
    {
      id_no: 3,
      messages: [
        "First chat of employee 3",
        "Second chat of employee 3",
        "Third chat of employee 3",
        "Fourth chat of employee 3",
        "Fifth chat of employee 3",
      ],
      rating10: 0,
      rating90: 0,
      x10: 0,
      x90: 0,
      image:
        "https://ui-avatars.com/api/?name=Shinaya Rastogi&background=random",
    },
    {
      id_no: 4,
      messages: [
        "First chat of employee 4",
        "Second chat of employee 4",
        "Third chat of employee 4",
        "Fourth chat of employee 4",
        "Fifth chat of employee 4",
      ],
      rating10: 0,
      rating90: 0,
      x10: 0,
      x90: 0,
      image: "https://ui-avatars.com/api/?name=Kaushik Band&background=random",
    },
    {
      id_no: 5,
      messages: [
        "First chat of employee 5",
        "Second chat of employee 5",
        "Third chat of employee 5",
        "Fourth chat of employee 5",
        "Fifth chat of employee 5",
      ],
      rating10: 0,
      rating90: 0,
      x10: 0,
      x90: 0,
      image: "https://ui-avatars.com/api/?name=Farooq Abdali&background=random",
    }
  );
}

app.get("/seeds", async (req, res) => {
  await initpop();
  res.send("SEEDED SUCCESSFULLY");
});

app.get("/route1", (req, res) => {
  res.render("homepg.ejs");
});

app.get("/route2", async (req, res) => {
  const documents = await User.find({});
  res.render("leaderboard.ejs", {documents});
});

app.get("/route1.5", async (req, res) => {
  const id = Math.floor(Math.random() * 5) + 1;
  const doc = await User.find({id_no: id});
  const others = await User.find({id_no: {$ne: id}});
  console.log(doc);
  console.log(others);
  res.render("rating.ejs", {id, doc, others});
});

app.post("/route_back", async (req, res) => {
  var avg = 0,
    rat = 0;
  var x = 0;
  if ("f1name" in req.body) {
    avg = avg + Number(req.body.f1name);
  } else x = 1;
  if ("f2name" in req.body) {
    avg = avg + Number(req.body.f2name);
  } else x = 2;
  if ("f3name" in req.body) {
    avg = avg + Number(req.body.f3name);
  } else x = 3;
  if ("f4name" in req.body) {
    avg = avg + Number(req.body.f4name);
  } else x = 4;
  if ("f5name" in req.body) {
    avg = avg + Number(req.body.f5name);
  } else x = 5;

  avg = avg / 4;

  if ("f1name" in req.body) {
    rat = 10 - 0.1 * Math.abs(avg - Number(req.body.f1name));
    const pc = await User.find({id_no: 1});

    pc[0].rating10 = (pc[0].rating10 * pc[0].x10 + rat) / (pc[0].x10 + 1);
    pc[0].x10 += 1;

    const score = await User.updateOne(
      {id_no: 1},
      {rating10: pc[0].rating10, x10: pc[0].x10}
    );
  }
  if ("f2name" in req.body) {
    rat = 10 - 0.1 * Math.abs(avg - Number(req.body.f2name));
    const pc = await User.find({id_no: 2});
    pc[0].rating10 = (pc[0].rating10 * pc[0].x10 + rat) / (pc[0].x10 + 1);
    pc[0].x10 += 1;

    const score = await User.updateOne(
      {id_no: 2},
      {rating10: pc[0].rating10, x10: pc[0].x10}
    );
  }
  if ("f3name" in req.body) {
    rat = 10 - 0.1 * Math.abs(avg - Number(req.body.f3name));
    const pc = await User.find({id_no: 3});
    pc[0].rating10 = (pc[0].rating10 * pc[0].x10 + rat) / (pc[0].x10 + 1);
    pc[0].x10 += 1;
    const score = await User.updateOne(
      {id_no: 3},
      {rating10: pc[0].rating10, x10: pc[0].x10}
    );
  }
  if ("f4name" in req.body) {
    rat = 10 - 0.1 * Math.abs(avg - Number(req.body.f4name));
    const pc = await User.find({id_no: 4});
    pc[0].rating10 = (pc[0].rating10 * pc[0].x10 + rat) / (pc[0].x10 + 1);
    pc[0].x10 += 1;

    core = await User.updateOne(
      {id_no: 4},
      {rating10: pc[0].rating10, x10: pc[0].x10}
    );
  }
  if ("f5name" in req.body) {
    rat = 10 - 0.1 * Math.abs(avg - Number(req.body.f5name));
    const pc = await User.find({id_no: 5});
    pc[0].rating10 = (pc[0].rating10 * pc[0].x10 + rat) / (pc[0].x10 + 1);
    pc[0].x10 += 1;
    const score = await User.updateOne(
      {id_no: 5},
      {rating10: pc[0].rating10, x10: pc[0].x10}
    );
  }

  avg *= 0.9;
  const sc = await User.find({id_no: x});
  sc[0].rating90 = (sc[0].rating90 * sc[0].x90 + avg) / (sc[0].x90 + 1);
  sc[0].x90 += 1;

  console.log(sc[0].rating90);
  const score = await User.updateOne(
    {id_no: x},
    {rating90: sc[0].rating90, x90: sc[0].x90}
  );
  res.redirect("/route2");
});

app.listen(3002, () => {
  console.log("Serving on port 3002");
});
