"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PrototipoSchema = new mongoose_1.default.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
    descricao: String,
    userStorie: { type: Schema.Types.ObjectId, ref: "UserStorie" },
    comentarios: []
}, { timestamps: true });
const Prototipo = mongoose_1.default.model("Prototipo", PrototipoSchema);
exports.default = Prototipo;
//# sourceMappingURL=prototipos.js.map