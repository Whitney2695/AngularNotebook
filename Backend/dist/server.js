"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import router definition
const notes_router_1 = __importDefault(require("./routers/notes.router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3003;
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use('/', notes_router_1.default);
app.get('/', (req, res) => {
    res.send("Youve reached the notes app");
});
app.listen(port, () => {
    console.log(`Listening on port: ${port}...`);
});
