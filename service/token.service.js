import jwt from 'jsonwebtoken'
import userModel from '../model/user.model'

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '8h'})
    return accessToken
    }

    async saveToken(userId, token) {
        return await userModel.updateOne({ id: userId }, { token })
      }

      async verifyToken(accessToken) {
        try {
          const user = await userModel.findOne({ token: accessToken })
          if (!user) {
            return null
          }
          const {id} = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)

          return id

        } catch (e) {
          return null
        }
      }

}

export default new TokenService