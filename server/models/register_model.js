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
const user = {
    registerUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_js_1.default.query('INSERT INTO users (firstname, lastname, email, username, passwd, street_address, postal_code, city, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [user.firstname, user.lastname, user.email, user.username, user.passwd, user.street_address, user.postal_code, user.city, user.phone_number]);
        return result;
    }),
};
exports.default = user;
