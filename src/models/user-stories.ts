import mongoose from "mongoose";


export type UserStorieModel = mongoose.Document & {
  autor: String,
  projeto: String,
  numero: Number,
  nome: String,
  descricao: String,
  preCondicoes: PreCondicao[],
  condicoes: Condicao[]
};

export type PreCondicao = {
  numero: Number,
  descricao: String
};

export type Condicao = {
  numero: Number,
  descricao: String
};

const UserStorieSchema = new mongoose.Schema({
  autor: String,
  projeto: String,
  numero: Number,
  nome: String,
  descricao: String,
  preCondicoes: [] as PreCondicao[],
  condicoes: [] as Condicao[]
}, { timestamps: true });

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const UserStorie = mongoose.model<UserStorieModel>("UserStorie", UserStorieSchema);
export default UserStorie;