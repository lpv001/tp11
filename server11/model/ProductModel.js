import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

const ProductSchema = mongoose.Schema({
    product_name: {
        type: String,
        require: true,
        unique: true
    },
    product_image: {
        type: String,
        require: true
    },
    sub_category_id: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    }
},{timestamps: true})

export default mongoose.model('product', ProductSchema)