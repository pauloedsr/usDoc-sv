"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const Timeline_1 = __importDefault(require("../models/Timeline"));
const Clip_1 = __importDefault(require("../models/Clip"));
exports.create = (req, res, next) => {
    req.assert("autor", "Autor é necessário").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.json({ success: false, errors: errors });
    }
    const model = new Timeline_1.default(req.body);
    model.save((err) => {
        if (err) {
            return next(err);
        }
        res.json({ success: true, obj: model });
    });
};
/**
 * Lista as timelines de acordo com autor
 */
exports.list = (req, res, next) => {
    Timeline_1.default.find({ autor: req.params.autor }, (err, timelines) => {
        if (err) {
            return next(err);
        }
        if (timelines)
            return res.json(timelines);
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
    let timeline;
    let clips;
    Timeline_1.default.findById(id, (err, data) => {
        if (err) {
            return next(err);
        }
        if (data)
            timeline = data;
        else
            return res.json({ success: false });
    }).then(() => {
        Clip_1.default.find({ timeline: id }, (err, data) => {
            clips = data;
        }).sort({ createdAt: -1 }).then(() => {
            return res.json({ timeline: timeline, clips: clips });
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
    Clip_1.default.remove({ timeline: req.params.id }, (err) => {
        if (err)
            return next(err);
    }).then(() => {
        Timeline_1.default.findByIdAndRemove(req.params.id).then(() => {
            return res.json({ success: true });
        });
    });
};
//# sourceMappingURL=timeline.js.map