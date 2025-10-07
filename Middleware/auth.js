import { hash, compare } from 'bcrypt'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

config()

const hashPassword = async (password) => {
  return await hash(password, 10)
}

const comparePasswords = async (original, hashed) => {
  return await compare(original, hashed)
}

const createToken = (username) => {
  return jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: '1 day' })
}

export { hashPassword, comparePasswords, createToken }
