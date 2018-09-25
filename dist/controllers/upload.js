"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const prototipos_1 = __importDefault(require("./../models/prototipos"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.DIR_UPLOAD = path_1.default.join(__dirname, "../uploads/");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(undefined, exports.DIR_UPLOAD);
    },
    filename: function (req, file, cb) {
        cb(undefined, Date.now() + "_" + file.originalname);
    }
});
const uploadMulter = multer_1.default({ storage: storage, limits: { fileSize: 6000000 } }).single("photo");
exports.upload = (req, res, next) => {
    uploadMulter(req, res, (err) => {
        if (err) {
            return res.status(422).send(err);
        }
        const prototipo = new prototipos_1.default(req.file);
        prototipo.userStorie = req.body.us;
        prototipo.descricao = prototipo.originalname;
        prototipo.save().then(() => {
            return res.json({ success: true, obj: prototipo });
        });
    });
};
exports.view = (req, res, next) => {
    const options = {
        root: exports.DIR_UPLOAD,
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
//# sourceMappingURL=upload.js.map