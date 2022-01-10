"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicSubscription = void 0;
const node_util_1 = require("node:util");
const wait = (0, node_util_1.promisify)(setTimeout);
class MusicSubscription {
    constructor(connection) {
        this.connection = connection;
    }
}
exports.MusicSubscription = MusicSubscription;
//# sourceMappingURL=MusicSubscription.js.map