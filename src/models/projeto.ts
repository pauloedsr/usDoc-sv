import mongoose from "mongoose";

const Schema = mongoose.Schema;

export type ProjetoModel = mongoose.Document & {
  nome: String,
  descricao: String,
  autor: String
};

const ProjetoSchema = new Schema({
  nome: String,
  descricao: String,
  autor: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const Projeto = mongoose.model<ProjetoModel>("Projeto", ProjetoSchema);
export default Projeto;