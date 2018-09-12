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
