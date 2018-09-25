"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const upload_1 = require("./upload");
const fs_1 = __importDefault(require("fs"));
const prototipos_1 = __importDefault(require("../models/prototipos"));
/**
 * Lista
 */
exports.list = (req, res, next) => {
    req.assert("idus", "ID é necessário").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.json({ success: false, obj: errors });
    }
    prototipos_1.default.find({ userStorie: req.params.idus }).sort({ descricao: 1 }).exec((err, obj) => {
        if (err)
            return next(err);
        res.json({ success: true, obj: obj });
    });
};
/**
 * Atualiza
 */
exports.update = (req, res, next) => {
    prototipos_1.default.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, obj) => {
        if (err)
            return next(err);
        exports.list(req, res, next);
    });
};
/**
 * Delete
 */
exports.remove = (req, res, next) => {
    prototipos_1.default.findByIdAndRemove(req.params.id).exec((err, obj) => {
        if (err)
            return next(err);
        fs_1.default.unlinkSync(path_1.default.join(upload_1.DIR_UPLOAD, obj.filename));
        req.params.idus = obj.userStorie;
        exports.list(req, res, next);
    });
};
/**
 * View
 */
exports.view = (req, res, next) => {
    req.assert("id", "ID é necessário").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.json({ success: false, obj: errors });
    }
    prototipos_1.default.findById(req.params.id).exec((err, obj) => {
        if (err)
            return next(err);
        res.json({ success: true, obj: obj });
    });
};
//# sourceMappingURL=prototipos.js.map