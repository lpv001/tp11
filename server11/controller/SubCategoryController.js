import SubCategoryModel from "../model/SubCategoryModel.js"

const create_subcategory = async (req, res) => {

    // api: http://localhost:3000/api/v1/subcategory/create_subcategory
    // json-body: {"subcategory_name": "Female","category_id": "647ee2a2a617c909d1d29c02"}
    // method: post

    const { subcategory_name, category_id } = req.body
    const subcategory = new SubCategoryModel({
        subcategory_name: subcategory_name,
        category_id: category_id
    })

    try {
        const exist_subcategory = await SubCategoryModel.findOne({ subcategory_name })
        if (exist_subcategory) return res.status(403).json({message: "subcategory is exist"})
        const new_subcategory = await subcategory.save()
        return res.json(new_subcategory)
    } catch (error) {
        return res.json(error)
    }

}

const get_subcategories = async (req, res) => {

    // api: http://localhost:3000/api/v1/subcategory/get_subcategories
    // method: get

    try {
        const subcategories = await SubCategoryModel.find({})
        return res.json(subcategories)
    } catch (error) {
        return res.json(error)
    }

}

const update_subcategory = async (req, res) => {

    // api: http://localhost:3000/api/v1/subcategory/update_subcategory
    // json-body: {"_id": "647ee73d09acb354c4ac1904","subcategory_name": "Iphone123123"}
    // method: put

    const { _id, subcategory_name } = req.body
    try {
        const subcategory = await SubCategoryModel.findByIdAndUpdate(_id, {
            subcategory_name: subcategory_name
        })
        const updated_subcategory = await SubCategoryModel.findById(_id)
        return res.json(updated_subcategory)
    } catch (error) {
        return res.json(error)
    }

}

const delete_subcategory = async (req, res) => {

    // api: http://localhost:3000/api/v1/subcategory/delete_subcategory
    // json-body: {"_id": "647eeba656a4c225fa0db431"}
    // method: delete

    const _id = req.body
    try {
        await SubCategoryModel.deleteOne({ _id: _id })
        return res.json({message: "subcategory has been deleted"})
    } catch (error) {
        return res.json(error)
    }
}

const get_product_by_subcategory = async (req, res) => {
    const _id = req.param('_id')
    console.log(_id)
    try {
        const categories = await SubCategoryModel.aggregate([
            {
                "$project": {
                  "_id": {
                    "$toString": "$_id"
                  },
                  category_name: 1,
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "sub_category_id",
                    as: "products"
                }
            },
            { 
                $match : { _id : _id } 
            }
        ])
        return res.json(categories)
    } catch (error) {
        return res.json(error)
    }

}

export{
    create_subcategory,
    get_subcategories,
    update_subcategory,
    delete_subcategory,
    get_product_by_subcategory
}