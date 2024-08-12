"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
dotenv_1.default.config();
function init() {
    const PORT = process.env.PORT;
    app_1.app.listen(PORT, () => {
        console.log(`server running at http://localhost:${PORT}`);
    });
}
init();
