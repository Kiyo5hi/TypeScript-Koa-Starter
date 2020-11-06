import app from "./app";
import {ENVIRONMENT, PORT} from "./util/secrets";

/**
 * Start Express server.
 */
const server = app.listen(PORT, () => {
    console.log(`->  App is running at http://localhost:${PORT} in ${ENVIRONMENT || "dev"} mode`);
    console.log("->  Press CTRL-C to stop\n");
});

export default server;
