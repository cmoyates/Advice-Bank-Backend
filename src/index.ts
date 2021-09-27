import post_router from "./routes/posts";
import user_router from "./routes/users";
import User from "./models/user";

import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();


// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// Passport
passport.serializeUser((user: any, done) => {
    return done(null, user.user_id);
});
passport.deserializeUser(async (id: number, done) => {
    const user = await User.getOne(id);
    return done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
    },
    async (_accessToken: any, _refreshToken: any, profile: passport.Profile, cb: (nullThing: null, profile: object)=>void) => {
        // Successful Auth
        if (profile.emails && profile.photos) {
            console.log("Getting user profile...");
            let user = await User.getOneByEmail(profile.emails[0].value);
            if (!user) {
                console.log("New user detected, creating new profile...");
                user = await User.create(
                    profile.emails[0].value,
                    profile.displayName,
                    profile.photos[0].value,
                    false
                );
            }
            cb(null, user);
        }
    }
));
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.FRONTEND_URL}/#/dashboard`);
  });
app.get("/getuser", (req, res) => {
    res.send(req.user);
});
app.get("/logout", (req, res) => {
    if (req.user) {
        req.logOut();
        res.send("done");
    }
});


// Posts
app.use("/posts", post_router);

// Users
app.use("/users", user_router);

app.use('/', (_req, res) => {
    res.send("Still working!");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});