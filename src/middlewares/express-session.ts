import expressSession from "express-session";
import User from "../interface/user";
import KnexSessionStore from "connect-session-knex";
import knex from "../utilities/knex";

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}
const knexSessionStore = KnexSessionStore(expressSession);
const store = new knexSessionStore({
  knex,
  tablename: "sessions", // optional. Defaults to 'sessions'
});

export default expressSession({
  name: "kelor",
  resave: true,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET_KEY!,
  cookie: {
    httpOnly: true,
    maxAge: 7200000,
    path: "/",
    secure: false,
  },
  store,
});
