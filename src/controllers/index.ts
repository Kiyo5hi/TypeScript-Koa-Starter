import Router from "@koa/router";

const router = new Router();

router.get("/", async function (ctx, next) {
        ctx.response.body = {"message": "Koa TypeScript Starter Project Running..."};
        await next();
    }
);

export {router as indexRouter};
