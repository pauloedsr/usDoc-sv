"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjetoSchema = new mongoose_1.default.Schema({
    nome: String,
    descricao: String,
    autor: String
}, { timestamps: true });
// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const Projeto = mongoose_1.default.model("Projeto", ProjetoSchema);
exports.default = Projeto;
//# sourceMappingURL=projeto.1.js.map