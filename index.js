import "dotenv/config";
import session from "express-session";
import express from 'express';
import cors from "cors";
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js"
import db from "./kambaz/database/index.js";
import UserRoutes from "./kambaz/users/routes.js";
import CourseRoutes from "./kambaz/courses/routes.js";
import ModulesRoutes from "./kambaz/modules/routes.js";
import EnrollmentRoutes from "./kambaz/enrollments/routes.js";
import mongoose from "mongoose";
import AssignmentRoutes from "./kambaz/assignments/routes.js";



const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
console.log("CONNECTION_STRING:", process.env.DATABASE_CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
   credentials: true,
   origin: process.env.CLIENT_URL || "http://localhost:3000",
}));

app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax",
    secure: false,   
  }
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    // domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));

UserRoutes(app);   
console.log("UserRoutes registered");
CourseRoutes(app);
ModulesRoutes(app);
EnrollmentRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);