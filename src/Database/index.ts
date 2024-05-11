import * as dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { ENV_PATH } from "src/Utils/Path";

dotenv.config({ path: ENV_PATH });

const Database = new Sequelize({
    dialect: "postgres",
    logging: false,
    query: { raw: false },

    // Host
    host: "roundhouse.proxy.rlwy.net",
    username: "postgres",
    password: "GuPuBlJZXKteXxisIJLRgJnvIcYdsMQO",
    port: 50558,
    database: "railway"
});

export default Database;

Database.sync({
    force: false,
    alter: true
}).then(() => console.log("[DATABASE] Synced ✔"));