import { Request, Response, NextFunction } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const dirUplodad = "./uploads/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(undefined, dirUplodad);
    },
    filename: function (req, file, cb) {
      cb(undefined, Date.now() + "_" + file.originalname);
    }
});

const uploadMulter = multer({storage: storage}).single("photo");
export let upload = (req: Request, res: Response, next: NextFunction) => {
    uploadMulter(req, res, (err) => {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured");
        }
        // No error occured.
        return res.json({upload: req.file});
  });
};

export let view = (req: Request, res: Response, next: NextFunction) => {
    const filename = req.params.name;
    const filePath = path.join(dirUplodad, filename);

    fs.readFile(filePath, {encoding: "utf-8"}, function(err, data) {
        if (!err) {
            console.log("received data", filePath);
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(data);
            res.end();
        } else {
            console.log(err);
        }
    });

};