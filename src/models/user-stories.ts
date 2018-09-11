import mongoose from "mongoose";

const Schema = mongoose.Schema;
export type UserStorieModel = mongoose.Document & {
  autor: String,
  projeto: String,
  numero: Number,
  nome: String,
  descricao: String,
  preCondicoes: PreCondicao[],
  criterios: Criterio[]
};

export type PreCondicao = {
  numero: Number,
  descricao: String
};

export type Criterio = {
  numero: Number,
  descricao: String
};

const UserStorieSchema = new mongoose.Schema({
  autor: { type: Schema.Types.ObjectId, ref: "User" },
  projeto: { type: Schema.Types.ObjectId, ref: "Projeto" },
  numero: Number,
  nome: String,
  descricao: String,
  preCondicoes: [] as PreCondicao[],
  criterios: [] as Criterio[]
}, { timestamps: true });

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const UserStorie = mongoose.model<UserStorieModel>("UserStorie", UserStorieSchema);
export default UserStorie;