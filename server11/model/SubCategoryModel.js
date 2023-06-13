import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

const SubCategorySchema = mongoose.Schema({
    subcategory_name: {
        type: String,
        require: true,
        unique: true
    },
    category_id:{
        type: String,
        require: true
    }
},{timestamps: true})

export default mongoose.model('subcategory', SubCategorySchema)