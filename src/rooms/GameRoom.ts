import {Room, Client} from "@colyseus/core";
import {GameState, Player} from "./schema/GameState";

export class GameRoom extends Room<GameState> {

    maxClients = 5;

    onCreate(options: any) {
        this.setState(new GameState());

        this.onMessage("updatePosition", (client, data) => {
            console.log("update received -> ");
            console.debug(JSON.stringify(data));
            const player = this.state.players.get(client.sessionId);
            player.x = data["x"];
            player.y = data['y'];
            player.z = data["z"];
            this.state.players.set(client.sessionId, player);
        });
    }

    onJoin(client: Client, options: any) {
        // Randomize player position on initializing.
        const newPlayer = new Player();
        newPlayer.x = Math.random() * 250 - 125;
        newPlayer.y = -1;
        newPlayer.z = Math.random() * 250 - 125;
        this.state.players.set(client.sessionId, newPlayer);
        console.log(client.sessionId, "joined!");
    }

    onLeave(client: Client, consented: boolean) {
        this.state.players.delete(client.sessionId);
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
