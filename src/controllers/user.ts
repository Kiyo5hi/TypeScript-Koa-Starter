import Router from "@koa/router";
import {Context, DefaultState} from "koa";
import {User, UserDocument, userJoiSchema} from "../models/User";
import Joi from "joi";

const router = new Router<DefaultState, Context>({prefix: "/user"});

/**
 * Create a new user document in the database
 * @route POST /user
 */
router.post("/", async function (ctx, next) {
    let user = ctx.request.body as UserDocument;

    try {
        await userJoiSchema.validateAsync(user);
    } catch (err) {
        ctx.throw(err, 422);
    }

    try {
        user = await new User({
            email: user.email,
            password: user.password
        }).save();

        ctx.response.status = 201;
        ctx.response.body = user;
    } catch (err) {
        ctx.throw("Duplicate email", 400);
    }

    await next();
});

/**
 * Get a user document by email
 * @route GET /user
 */
router.get("/", async (ctx, next) => {
    let user = ctx.request.body as UserDocument;

    await validateHelper(user, ctx);

    user = await User.findOne({email: user.email}).select("-password");
    if (!user) ctx.throw("User not found", 404);
    ctx.response.status = 200;
    ctx.response.body = user;

    await next();
});

/**
 * Get multiple users at once
 * @route Get /users
 */
router.get("s", async (ctx, next) => {
    ctx.response.body = "To Be Done";
    //TODO: get multiple users and display them by pages
    await next();
});


/**
 * Delete a user document by email
 * @route DELETE /user
 */
router.delete("/", async (ctx, next) => {
    const user = ctx.request.body as UserDocument;

    await validateHelper(user, ctx);
    await User.findOneAndRemove({email: user.email});
    ctx.response.status = 204;

    await next();
});

const validateHelper = async function (user: UserDocument, ctx: Context) {
    try {
        await Joi.object({
            email: Joi.string().email().required()
        }).validateAsync(user);
    } catch (err) {
        ctx.throw(err, 422);
    }
};

export {router as userRouter};
