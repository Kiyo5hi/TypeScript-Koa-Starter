import Koa from "koa";
import mongoose from "mongoose";
import bodyParser from "koa-bodyparser";
import session from "koa-session";
import {MONGODB_URI, SESSION_SECRET} from "./util/secrets";
import {SESSION_CONFIG} from "./config/config";

// Controllers (route handlers)
import {indexRouter} from "./controllers/index";
import {userRouter} from "./controllers/user";

// Create Koa server
const app = new Koa();
app.keys = [SESSION_SECRET];

// Connect to MongoDB
(async function () {
    try {
        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log("MongoDB connected successfully.");
    } catch (err) {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // process.exit();
    }
})();

app.use(
    bodyParser({
        onerror: function (err, ctx) {
            ctx.throw("JSON format error", 422);
        },
    })
);
app.use(session(SESSION_CONFIG, app));

/**
 * API routes.
 */
app.use(indexRouter.routes());
app.use(userRouter.routes());

export default app;