import { findUserByUsername } from "../database/manager/User.js";
import bcrypt from "bcrypt"
import {randomBytes} from "crypto"

export default async function authenticationService ({username, password}) {
  const user = await findUserByUsername(username)

  if (!user) {
    return new Error("Nome de usuário e/ou senha incorreto(s)")
  }

  const matchPassword = await bcrypt.compare(password, user.password_hash)
  
  if (!matchPassword) {
    return new Error("Nome de usuário e/ou senha incorreto(s)")
  }

  const token = await randomBytes(64).toString('hex')

  return {
    token,
    id: user.id,
    admin: user.is_admin
  }
}