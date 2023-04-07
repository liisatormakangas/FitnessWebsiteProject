"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const story_controller_js_1 = __importDefault(require("./controllers/story_controller.js"));
const course_controller_js_1 = __importDefault(require("./controllers/course_controller.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const PORT = 3001;
app.use('/story', story_controller_js_1.default);
app.use('/course', course_controller_js_1.default);
app.listen(PORT);
