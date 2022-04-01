import ApiError from "../error-handling/api.error"

const roleAccess = (role) => async (req, res, next) => {
    const roleCurrentUser = req.user.role
    if(!roleCurrentUser !== role) {
        return next(ApiError.Forbidden())
    }
    next()
}

export default roleAccess