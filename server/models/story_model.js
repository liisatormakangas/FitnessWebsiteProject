"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = __importDefault(require("../db.js"));
const story = {
    getAllStories: () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('SELECT * FROM stories');
        return result;
    }),
    getStoryById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('SELECT * FROM stories WHERE id_story = $1', [id]);
        // If the story exists, get the comments for that story        
        if (result.rowCount > 0) {
            const commentResult = yield db_js_1.default.query('SELECT * FROM comments WHERE id_story = $1', [id]);
            result.rows[0].comments = commentResult.rows;
        }
        return result;
    }),
    addNewStory: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('insert into stories (author, title, story, blog_date, image_name) VALUES ($1, $2, $3, $4) RETURNING *', [body.author, body.title, body.story, body.blog_date, body.image_name]);
        return result;
    }),
    // post a comment to a story
    addStoryComment: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('insert into comments (id_story, id_user, content, date_added) VALUES ($1, $2, $3, $4) RETURNING *', [body.id_story, body.id_user, body.content, body.date_added]);
        return result;
    }),
    // delete a comment from a story
    deleteStoryComment: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('DELETE FROM comments WHERE id_response = $1', [id]);
        return result;
    })
};
exports.default = story;
