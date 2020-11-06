import app from "./app";
import {ENVIRONMENT, PORT} from "./util/secrets";
import logger from "./util/logger";

/**
 * Start Express server.
 */
const server = app.listen(PORT, () => {
    logger.info(`App is running at http://localhost:${PORT} in ${ENVIRONMENT || "dev"} mode`);
    logger.info("Press CTRL-C to stop\n");
});

export default server;
