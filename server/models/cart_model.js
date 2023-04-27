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
    // add user_id:number inside () and change user_id to userId>number
    getCart: (user_id) => __awaiter(void 0, void 0, void 0, function* () {
        //const result = await pool.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course WHERE id_user = $1', [1]);
        //to fix get user id to cart
        const result = yield db_js_1.default.query('SELECT * FROM cart INNER JOIN courses ON cart.id_course = courses.id_course WHERE id_user = $1', [user_id]);
        return result;
    }),
    //old code save here
    /*     addCourse: async (course_id: number) => {
            const result = await pool.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [1, course_id]);
            return result;
        }, */
    //new code, to add a course to the cart and change course?id to user_id,
    // and chnge _id to courseId: number, userId:number 4/26 new code
    addCourse: (courseId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        //console.log(courseId);
        //console.log(userId);
        const result = yield db_js_1.default.query('INSERT INTO cart(id_user, id_course) VALUES ($1, $2)', [userId, courseId]);
        return result;
    }),
    //add new code for remove and clear cart change _id to courseId: number, userId:number
    removeCourse: (courseId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('DELETE FROM cart WHERE id_course = $1 AND id_user = $2', [courseId, userId]);
        return result;
    }),
    clearCart: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('DELETE FROM cart WHERE id_user = $1', [userId]);
        return result;
    }),
};
exports.default = cart;
