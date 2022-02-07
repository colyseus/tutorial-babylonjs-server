import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";

import { GameRoom } from "./rooms/GameRoom";

export default Arena({
    getId: () => "Babylon Colyseus Demo App",

    initializeGameServer: (gameServer) => {
        gameServer.define('my_game', GameRoom);

    },

    initializeExpress: (app) => {
        app.get("/", (req, res) => {
            res.send("Server ready!");
        });

        app.use("/colyseus", monitor());
    },

    beforeListen: () => {
    }
});
