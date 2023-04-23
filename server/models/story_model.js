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
            // If the story has comments, get the reaction count for the story
            const likeCount = yield db_js_1.default.query('SELECT COUNT(id_reaction) as like_count FROM story_reactions WHERE id_story = $1 AND reaction_type = $2', [id, 'like']);
            const disLikeCount = yield db_js_1.default.query('SELECT COUNT(id_reaction) as dislike_count FROM story_reactions WHERE id_story = $1 AND reaction_type = $2', [id, 'dislike']);
            //const userReaction = await pool.query('SELECT reaction_type FROM story_reactions WHERE id_story = $1 AND id_user = $2', [id, 'dislike']);
            result.rows[0].like_count = likeCount.rows[0].like_count;
            result.rows[0].dislike_count = disLikeCount.rows[0].dislike_count;
        }
        // count the number of comments for a story
        const countStoryComments = yield db_js_1.default.query('SELECT COUNT(id_response) as comment_count FROM comments WHERE id_story = $1', [id]);
        result.rows[0].comment_count = countStoryComments.rows[0].comment_count;
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
    // post a comment to a story
    addStoryReaction: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('insert into story_reactions (id_story, id_user, reaction_type) VALUES ($1, $2, $3) RETURNING *', [body.id_story, body.id_user, body.reaction_type]);
        return result;
    }),
    // delete a comment from a story
    deleteStoryReaction: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('DELETE FROM story_reactions WHERE id_response = $1', [id]);
        return result;
    }),
    // delete a comment from a story
    deleteStoryComment: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('DELETE FROM comments WHERE id_response = $1', [id]);
        return result;
    }),
};
exports.default = story;
