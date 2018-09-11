import Prototipo, { PrototipoModel } from "./../models/prototipos";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";

const dirUplodad = path.join(__dirname, "../uploads/");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(undefined, dirUplodad);
    },
    filename: function (req, file, cb) {
      cb(undefined, Date.now() + "_" + file.originalname);
    }
});

const uploadMulter = multer({storage: storage, limits: {fileSize: 6000000}}).single("photo");
export let upload = (req: Request, res: Response, next: NextFunction) => {
    uploadMulter(req, res, (err) => {
        if (err) {
          return res.status(422).send(err);
        }
        const prototipo = new Prototipo(req.file);
        prototipo.userStorie = req.body.us;
        prototipo.save().then(() => {
            return res.json({success: true, obj: prototipo});
        });
  });
};

export let view = (req: Request, res: Response, next: NextFunction) => {
    const filename = req.params.name;
    const filePath = path.join("E:\\nodejs\\projetos\\usDoc-sv\\uploads", filename);

    const options = {
        root: dirUplodad,
        dotfiles: "deny"
    };
    console.log(options.root, req.params.name);

    res.sendFile(req.params.name, options, (err) => {
        if (err) {
            console.log(err);
            res.status(500).end();
        }
    });

};