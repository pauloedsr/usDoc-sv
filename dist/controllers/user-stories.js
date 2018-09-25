"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const user_stories_1 = __importDefault(require("../models/user-stories"));
const prototipos_1 = __importDefault(require("../models/prototipos"));
/**
 * Cria
 */
exports.create = (req, res, next) => {
    req.assert("projeto", "Projeto não informado").notEmpty();
    req.assert("autor", "Autor é necessário").notEmpty();
    // req.assert("userStorie", "Não é um base 64 válido").isBase64();
    const errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors);
        return res.json({ success: false, errors: errors });
    }
    const userStorie = new user_stories_1.default(req.body);
    userStorie.save((err) => {
        if (err) {
            return next(err);
        }
        res.json({ success: true, obj: userStorie });
    });
};
/**
 * Atualiza
 */
exports.update = (req, res, next) => {
    const errors = req.validationErrors();
    if (errors) {
        return res.json({ success: false, errors: errors });
    }
    user_stories_1.default.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, obj) => {
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
    user_stories_1.default.findByIdAndRemove(req.params.id, (err) => {
        if (err)
            return next(err);
        res.json({ success: true });
    });
};
exports.view = (req, res, next) => {
    req.assert("id", "ID é necessário").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.json({ success: false, obj: errors });
    }
    const id = req.params.id;
    user_stories_1.default.findById(id).populate("projeto").exec((err, data) => {
        if (err) {
            return res.json({ success: false, obj: err });
        }
        else {
            prototipos_1.default.find({ userStorie: id }).sort({ descricao: 1, originalname: 1 }).exec((err, dataPrototipos) => {
                data.prototipos = dataPrototipos;
                const retorno = data.toJSON();
                retorno.prototipos = dataPrototipos;
                return res.json({ success: true, obj: retorno });
            });
        }
    });
};
//# sourceMappingURL=user-stories.js.map