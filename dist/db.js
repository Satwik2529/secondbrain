"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
mongoose_2.default.connect("mongodb://localhost:27017/important");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: String
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
const ContentSchema = new mongoose_1.Schema({
    tittle: String,
    link: String,
    type: String,
    tags: [{ type: mongoose_2.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_2.default.Types.ObjectId, ref: 'User', required: true }
});
const LinkSchema = new mongoose_1.Schema({
    hash: String,
    userId: { type: mongoose_2.default.Types.ObjectId, ref: 'User', required: true, unique: true }
});
exports.ContentModel = (0, mongoose_1.model)("Content", ContentSchema);
exports.LinkModel = (0, mongoose_1.model)("Links", LinkSchema);
