import mongoose from "mongoose";

const Schema = mongoose.Schema;
export type PrototipoModel = mongoose.Document & {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number,
  userStorie: string,
};

const PrototipoSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  userStorie: { type: Schema.Types.ObjectId, ref: "UserStorie" }
}, { timestamps: true });

const Prototipo = mongoose.model<PrototipoModel>("Prototipo", PrototipoSchema);
export default Prototipo;