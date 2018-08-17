import mongoose from "mongoose";


export type ProjetoModel = mongoose.Document & {
  nome: String,
  descricao: String,
  autor: String
};

const ProjetoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  autor: String
}, { timestamps: true });

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const Projeto = mongoose.model<ProjetoModel>("Projeto", ProjetoSchema);
export default Projeto;