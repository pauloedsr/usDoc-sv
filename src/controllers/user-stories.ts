import { default as UserStorie, UserStorieModel } from "../models/user-stories";
import { Request, Response, NextFunction } from "express";
import Projeto from "../models/projeto";

/**
 * Cria
 */
export let create = (req: Request, res: Response, next: NextFunction) => {
  req.assert("projeto", "Projeto não informado").notEmpty();
  req.assert("autor", "Autor é necessário").notEmpty();
  // req.assert("userStorie", "Não é um base 64 válido").isBase64();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.json({success: false, errors : errors});
  }

  const userStorie = new UserStorie(req.body);
  userStorie.save((err) => {
    if (err) { return next(err); }
    res.json({success: true, obj: userStorie});
  });
};

/**
 * Atualiza
 */
export let update = (req: Request, res: Response, next: NextFunction) => {
  req.assert("id", "ID é necessário").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.json({success: false, errors : errors});
  }

  UserStorie.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, obj) => {
    if (err) return next(err);
    res.json({success: true, obj: obj});
  });
};

/**
 * Remove
 */
export let remove = (req: Request, res: Response, next: NextFunction) => {
  req.assert("id", "ID é necessário").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.json({success: false, errors : errors});
  }

  UserStorie.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    res.json({success: true});
  });
};

export let view = (req: Request, res: Response, next: NextFunction) => {
  req.assert("id", "ID é necessário").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.json({success: false, errors : errors});
  }

  const id = req.params.id;
  let userStorie: UserStorieModel;
  UserStorie.findById(id, (err, data) => {
    if (err) { return next(err); }
    if (data)
      userStorie = data;
    else
      return res.json({success: false});
  }).then(() => {
    Projeto.findById(userStorie.projeto, (err, dataProj) => {
      if (err) { return next(err); }
      if (dataProj)
        return res.json({success: true, userStorie: userStorie, projeto: dataProj});
    });
  });
};