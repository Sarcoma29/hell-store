const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo} = require('../models/models')
const ApiError = require("../error/ApiError")
const { deserialize } = require('v8')


class ProductController {
    async create (req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, "..", "static", fileName))

            if(!info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    Product.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id

                    })
                })

            }
            const product = await Product.create({name, price, brandId, typeId, img: fileName})
            
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        

    }
    async getAll (req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;

        if(!brandId && !typeId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if(!brandId && typeId) {
            products = await Product.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && !typeId) {
            products = await Product.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(brandId && typeId) {
            products = await Product.findAndCountAll({where: {brandId,typeId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne (req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(product)
    }

    async deleteOne(req,res){
        const {name, brandId, typeId} = req.body
        const products = await Product.destroy({where: {name, brandId, typeId}})
        return res.json(products)
    }
}

module.exports = new ProductController();