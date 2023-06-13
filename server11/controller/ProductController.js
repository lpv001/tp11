import ProductModel from "../model/ProductModel.js"
import connectDB from "../connectdb.js"

const create_product = async (req, res) => {

    // api: http://localhost:3000/api/v1/product/create_product
    // json-body: {"product_name": "Jeans","product_image": "no","sub_category_id": "647ee7e98c8e3573c086e445","description": "no","price": "no"}
    // method: post

    const { product_name, product_image, sub_category_id, description, price } = req.body
    const product = new ProductModel({
        product_name: product_name,
        product_image: product_image,
        sub_category_id: sub_category_id,
        description: description,
        price: price
    })

    try {
        const new_product = await product.save()
        return res.json(new_product)
    } catch (error) {
        return res.json(error)
    }

}

const get_products = async (req, res) => {

    // api: http://localhost:3000/api/v1/product/get_products
    // method: get

    try {
        const products = await ProductModel.find({})
        return res.json(products)
    } catch (error) {
        return res.json(error)
    }

}

const update_product = async (req, res) => {

    // api: http://localhost:3000/api/v1/product/update_product
    // json-body: {"_id": "6480613e1e11a5ae77159fa9","product_name": "Jeanss","product_image": "no","sub_category_id": "647ee7e98c8e3573c086e445","description": "no","price": "no"}
    // method: put

    const { _id, product_name, product_image, sub_category_id, description, price } = req.body
    try {
        const product = await ProductModel.findByIdAndUpdate(_id, {
            product_name: product_name,
            product_image: product_image,
            sub_category_id: sub_category_id,
            description: description,
            price: price
        })
        const updated_product = await ProductModel.findById(_id)
        return res.json(updated_product)
    } catch (error) {
        return res.json(error)
    }

}

const delete_product = async (req, res) => {

    // api: http://localhost:3000/api/v1/product/delete_product
    // json-body: {"_id": "647eebbc56a4c225fa0db439"}
    // method: delete

    const _id = req.body
    try {
        await ProductModel.deleteOne({ _id: _id })
        return res.json({message: "product has been deleted"})
    } catch (error) {
        return res.json(error)
    }
}

export{
    create_product,
    get_products,
    update_product,
    delete_product
}