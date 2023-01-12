import express from "express";
import bodyParser from "body-parser";

import {
  get_all_banners,
  add_banner,
  delete_banner,
  update_banner,
} from "./controlers/banners_controller.js";
import {
  get_all_news,
  add_news,
  delete_news,
  update_news,
} from "./controlers/news_controler.js";
import {
  get_all_events,
  add_event,
  delete_event,
  update_event,
} from "./controlers/events_controller.js";

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));
app.set("view engine", "ejs");

const app_data = {
  banner_data: null,
  news_data: null,
  events_data: null,
};

const refresh = async () => {
  app_data.banner_data = await get_all_banners();
  app_data.news_data = await get_all_news();
  app_data.events_data = await get_all_events();
};

app.get("/", async (req, res) => {
  console.log(app_data);
  res.render("index", app_data);
});

app.get("/logged", async (req, res) => {
  res.render("logged", app_data);
});

/**
 * NEWS STUFF
 */
app.post("/add_news", urlencodedParser, async (req, res) => {
  const result = await add_news(req, res);
  console.log(result);
  await refresh();
  res.redirect("/logged");
});
app.post("/delete_news", urlencodedParser, async (req, res) => {
  const result = await delete_news(req, res);
  console.log(result);
  await refresh();
  res.redirect("/logged");
});
app.post("/update_news", urlencodedParser, async (req, res) => {
  const result = await update_news(req, res);
  console.log(result);
  await refresh();
  res.redirect("/logged");
});

/**
 * HERO STUFF
 */
app.post("/add_banner", urlencodedParser, async (req, res) => {
  const result = await add_banner(req, res);
  console.log(result);
  await refresh();
  res.redirect("/logged");
});
app.post("/delete_banner", urlencodedParser, async (req, res) => {
  const result = await delete_banner(req, res);
  console.log(result);
  await refresh();
  res.redirect("/logged");
});
app.post("/update_banner", urlencodedParser, async (req, res) => {
  const result = await update_banner(req, res);
  console.log(result);
  await refresh();
  res.redirect("/logged");
});

/**
 * EVENTS STUFF
 */
app.post("/add_event", urlencodedParser, async (req, res) => {
  const result = await add_event(req, res);
  console.log(result);
  await refresh();
  res.redirect("/logged");
});
app.post("/delete_event", urlencodedParser, async (req, res) => {
  const result = await delete_event(req, res);
  console.log(result);
  await refresh();
  res.redirect("/logged");
});
app.post("/update_event", urlencodedParser, async (req, res) => {
  const result = await update_event(req, res);
  console.log(result);
  await refresh();
  res.redirect("/logged");
});

app.get("/about", async (req, res) => {
  res.render("about");
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("inercia app listening at http://%s:%s", host, port);
});

refresh();
