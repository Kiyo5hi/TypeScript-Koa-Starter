import Router from "@koa/router";
import {Context, DefaultState} from "koa";
import {User, UserDocument, userJoiSchema} from "../models/User";
import Joi from "joi";

const router = new Router<DefaultState, Context>({prefix: "/user"});

router.post("/", async function (ctx, next) {
    let user = ctx.request.body as UserDocument;

    try {
        await userJoiSchema.validateAsync(user);
    } catch (err) {
        ctx.throw(400, err);
    }

    user = await new User({
        email: user.email,
        password: user.password
    }).save();

    ctx.response.status = 201;
    ctx.response.body = user;
    await next();
});

router.get("/", async function (ctx, next) {
    const email = ctx.request.body.email;
    try {
        await Joi.string().email().required().validateAsync(email);
    } catch (err) {
        ctx.throw(err, 422);
    }

    try {
        const user = await User.findOne({email: email}).select("-password");
        if (!user) ctx.throw("User not found", 404);
        ctx.response.status = 200;
        ctx.response.body = user;
    } catch (err) {
        ctx.throw(err, 404);
    }

    await next();
});

export {router as userRouter};
