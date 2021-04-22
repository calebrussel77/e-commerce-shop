"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor(port) {
        this.app = express_1.default();
        this.port = port;
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port : ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map