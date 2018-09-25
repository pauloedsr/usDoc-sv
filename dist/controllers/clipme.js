"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Clip_1 = __importDefault(require("../models/Clip"));
/**
 * Cria
 */
exports.create = (req, res, next) => {
    req.assert("timeline", "Timeline não informada").notEmpty();
    req.assert("autor", "Autor é necessário").notEmpty();
    // req.assert("clip", "Não é um base 64 válido").isBase64();
    const errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors);
        return res.json({ success: false, errors: errors });
    }
    const clip = new Clip_1.default(req.body);
    clip.save((err) => {
        if (err) {
            return next(err);
        }
        res.json({ success: true, obj: clip });
    });
};
/**
 * Atualiza
 */
exports.update = (req, res, next) => {
    req.assert("clip", "Não é um base 64 válido").isBase64();
    req.assert("id", "ID é necessário").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.json({ success: false, errors: errors });
    }
    Clip_1.default.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, obj) => {
        if (err)
            return next(err);
        res.json({ success: true, obj: obj });
    });
};
/**
 * Remove
 */
exports.remove = (req, res, next) => {
    req.assert("id", "ID é necessário").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.json({ success: false, errors: errors });
    }
    Clip_1.default.findByIdAndRemove(req.params.id, (err) => {
        if (err)
            return next(err);
        res.json({ success: true });
    });
};
//# sourceMappingURL=clipme.js.map