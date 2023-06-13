import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

const CategorySchema = mongoose.Schema({
    category_name: {
        type: String,
        require: true,
        unique: true
    },
},{timestamps: true})

export default mongoose.model('category', CategorySchema)