import { Decoder } from "./src/Decoder";
import { Satellite } from "./src/Satellite";

const Kenobi = new Satellite("Kenobi", { x: 50, y: 100 });
const Skywalker = new Satellite("Skywalker", { x: 100, y: 100 });
const Sato = new Satellite("Sato", { x: 96, y: 129.59591794226543 });

Kenobi.receiveMessage(50, ["este", "", "", "mensaje", ""]);
Skywalker.receiveMessage(20, ["", "es", "", "", "secreto"]);
Sato.receiveMessage(10, ["este", "", "un", "", ""]);

const decoder = new Decoder([Kenobi, Skywalker, Sato]);

const location = decoder.getLocation();
const message = decoder.getMessage();

console.log({ location, message });
