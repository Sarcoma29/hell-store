const ApiError = require('../error/ApiError')
class UserController {
    async registraion (req, res) {
        
    }
    async login (req, res) {
        
    }
    async check (req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest("Не задан ID"))
        }
        
        return res.json({message: 'hello niger 1'})
    }
}

module.exports = new UserController();