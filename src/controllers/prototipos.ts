import path from "path";
import { DIR_UPLOAD } from "./upload";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import Prototipo from "../models/prototipos";


/**
 * Lista
 */
export let list = (req: Request, res: Response, next: NextFunction) => {
    req.assert("idus", "ID é necessário").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      return res.json({success: false, obj : errors});
    }
    console.log(req.params.idus);

    Prototipo.find({userStorie: req.params.idus}).sort({descricao: 1}).exec((err, obj) => {
      if (err) return next(err);
      res.json({success: true, obj: obj});
    });
};

/**
 * Atualiza
 */
export let update = (req: Request, res: Response, next: NextFunction) => {
    Prototipo.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, obj) => {
        if (err) return next(err);
        list(req, res, next);
    });
};

/**
 * Atualiza
 */
export let remove = (req: Request, res: Response, next: NextFunction) => {
    Prototipo.findByIdAndRemove(req.params.id).exec((err, obj) => {
        if (err) return next(err);
        fs.unlinkSync(path.join(DIR_UPLOAD, obj.filename));
        req.params.idus = obj.userStorie;
        list(req, res, next);
    });
};
