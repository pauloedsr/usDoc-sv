"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const timelineSchema = new mongoose_1.default.Schema({
    autor: String,
    nome: String,
    colaboradores: [{ autor: String }]
}, { timestamps: true });
// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const Timeline = mongoose_1.default.model("Timeline", timelineSchema);
exports.default = Timeline;
//# sourceMappingURL=Timeline.js.map