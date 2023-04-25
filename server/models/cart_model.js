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
const cart = {
    getCart: () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course WHERE id_user = $1', [1]);
        return result;
    }),
    //old code save here
    /*     addCourse: async (course_id: number) => {
            const result = await pool.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [1, course_id]);
            return result;
        }, */
    //new code, to add a course to the cart
    addCourse: (course_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [user_id, course_id]);
        return result;
    }),
};
//add get cart by user id
getCart: (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_js_1.default.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course INNER JOIN users ON cart.id_user = users.id_user WHERE cart.id_user = $1', [userId]);
    return result;
});
exports.default = cart;
