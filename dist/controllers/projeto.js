"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const projeto_1 = __importDefault(require("../models/projeto"));
const user_stories_1 = __importDefault(require("../models/user-stories"));
exports.create = (req, res, next) => {
    req.assert("autor", "Autor é necessário").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.json({ success: false, errors: errors });
    }
    const model = new projeto_1.default(req.body);
    model.save((err, product) => {
        if (err) {
            return next(err);
        }
        res.json(product);
    });
};
/**
 * Atualiza um projeto
 */
exports.update = (req, res, next) => {
    const errors = req.validationErrors();
    if (errors) {
        return res.json({ success: false, errors: errors });
    }
    projeto_1.default.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, obj) => {
        if (err)
            return next(err);
        res.json(obj);
    });
};
/**
 * Lista as Projetos de acordo com autor
 */
exports.list = (req, res, next) => {
    projeto_1.default.find({ autor: req.params.autor }, (err, Projetos) => {
        if (err) {
            return next(err);
        }
        if (Projetos)
            return res.json(Projetos);
        else
            return res.json({ success: false });
    });
};
exports.view = (req, res, next) => {
    req.assert("id", "ID é necessário").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.json({ success: false, errors: errors });
    }
    const id = req.params.id;
    let projeto;
    let userStories;
    projeto_1.default.findById(id, (err, data) => {
        if (err) {
            return next(err);
        }
        if (data)
            projeto = data;
        else
            return res.json({ success: false });
    }).populate("autor", ["email", "_id"]).then(() => {
        user_stories_1.default.find({ projeto: id }, (err, data) => {
            userStories = data;
        }).sort({ numero: -1 }).then(() => {
            return res.json({ projeto: projeto, userStories: userStories });
        });
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
    user_stories_1.default.remove({ Projeto: req.params.id }, (err) => {
        if (err)
            return next(err);
    }).then(() => {
        projeto_1.default.findByIdAndRemove(req.params.id).then(() => {
            return res.json({ success: true });
        });
    });
};
//# sourceMappingURL=projeto.js.map