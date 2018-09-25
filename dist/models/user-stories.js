"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserStorieSchema = new mongoose_1.default.Schema({
    autor: { type: Schema.Types.ObjectId, ref: "User" },
    projeto: { type: Schema.Types.ObjectId, ref: "Projeto" },
    numero: Number,
    nome: String,
    descricao: String,
    preCondicoes: [],
    criterios: [],
}, { timestamps: true });
// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const UserStorie = mongoose_1.default.model("UserStorie", UserStorieSchema);
exports.default = UserStorie;
//# sourceMappingURL=user-stories.js.map