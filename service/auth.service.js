import bcrypt from 'bcryptjs'

import ApiError from '../error-handling/api.error'
import UserModel from '../model/user.model'
import tokenService from './token.service'

class AuthService {

    async registration(login, password, name, role) {
        const updateLogin = login.trim().toLocaleLowerCase()
        const candidate = await UserModel.findOne({ updateLogin })
        if (candidate) {
            throw ApiError.Conflict(`Пользователь с адрессом ${email} уже существует`)
          }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await UserModel.create({login: updateLogin, password: hashPassword, name, role})
        return user
    }

    async login(login, password) {
        const user = await UserModel.findOne({ login })
        if (!user) {
          throw ApiError.BadRequest('Ошибка авторизации')
        }
        const isEquals = await bcrypt.compare(password, user.password)
        if(!isEquals) {
          throw ApiError.BadRequest('Ошибка авторизации')
        }
        const payload = {id: user._id, email: user.email}
        const token = tokenService.generateTokens(payload)
        await tokenService.saveToken(user._id, token)
        return token
      }
    
      async logout(id, resetToken) {
        const token = await tokenService.saveToken(id, resetToken)
        return token
      }
}

export default new AuthService