import { default as Projeto, ProjetoModel } from "../models/projeto";
import { default as UserStorie, UserStorieModel } from "../models/user-stories";
import { Request, Response, NextFunction } from "express";


export let create = (req: Request, res: Response, next: NextFunction) => {
  req.assert("autor", "Autor é necessário").notEmpty();
  const errors = req.validationErrors();

  if (errors) {
    return res.json({success: false, errors : errors});
  }

  const model = new Projeto(req.body);
  model.save((err) => {
    if (err) { return next(err); }
    res.json({success: true, obj: model});
  });
};

/**
 * Lista as Projetos de acordo com autor
 */
export let list = (req: Request, res: Response, next: NextFunction) => {
  Projeto.find({autor : req.params.autor}, (err, Projetos) => {
    if (err) { return next(err); }
    if (Projetos)
      return res.json(Projetos);
    else
      return res.json({success: false});
  });
};

export let view = (req: Request, res: Response, next: NextFunction) => {
  req.assert("id", "ID é necessário").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.json({success: false, errors : errors});
  }

  const id = req.params.id;
  let projeto: ProjetoModel;
  let userStories: UserStorieModel[];
  Projeto.findById(id, (err, data) => {
    if (err) { return next(err); }
    if (data)
      projeto = data;
    else
      return res.json({success: false});
  }).then(() => {
    UserStorie.find({projeto: id}, (err, data) => {
      userStories = data;
    }).sort({numero : -1}).then(() => {
      return res.json({projeto: projeto, userStories: userStories});
    });
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

  UserStorie.remove({Projeto : req.params.id}, (err) => {
    if (err) return next(err);
  }).then(() => {
    Projeto.findByIdAndRemove(req.params.id).then(() => {
      return res.json({success: true});
    });
  });
};