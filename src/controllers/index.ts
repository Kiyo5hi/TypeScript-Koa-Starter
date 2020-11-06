import Router from "@koa/router";

const router = new Router();

/**
 * Welcome message
 * @route GET /
 */
router.all("/", async function (ctx, next) {
        ctx.response.body = {
            "message": "Koa TypeScript Starter Project Running...",
            "author": "Kiyo5hi",
            "GitHub Repo": "https://github.com/Kiyo5hi/TypeScript-Koa-Starter"
        };
        await next();
    }
);

export {router as indexRouter};
