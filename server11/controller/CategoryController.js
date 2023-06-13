import CategoryModel from "../model/CategoryModel.js"

const create_category = async (req, res) => {

    // api: http://localhost:3000/api/v1/category/create_category
    // json-body: {"category_name": "Tablet"}
    // method: post

    const { category_name } = req.body
    const category = new CategoryModel({
        category_name: category_name
    })

    try {
        const exist_category = await CategoryModel.findOne({ category_name })
        if (exist_category) return res.status(403).json({message: "category is exist"})
        const new_category = await category.save()
        return res.json(new_category)
    } catch (error) {
        return res.json(error)
    }

}

const get_categories = async (req, res) => {

    // api: http://localhost:3000/api/v1/category/get_categories
    // method: get

    try {
        const categories = await CategoryModel.aggregate([
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
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "subcategories"
                }
            }
        ])
        return res.json(categories)
    } catch (error) {
        return res.json(error)
    }

}

const update_category = async (req, res) => {

    // api: http://localhost:3000/api/v1/category/update_category
    // json-body: {"_id": "647ee2ada617c909d1d29c08","category_name": "Tablet"}
    // method: put

    const { _id, category_name } = req.body
    try {
        const category = await CategoryModel.findByIdAndUpdate(_id, {
            category_name: category_name
        })
        const updated_category = await CategoryModel.findById(_id)
        return res.json(updated_category)
    } catch (error) {
        return res.json(error)
    }

}

const delete_category = async (req, res) => {

    // api: http://localhost:3000/api/v1/category/delete_category
    // json-body: {"_id": "647ee2ada617c909d1d29c08"}
    // method: delete

    const _id = req.body
    try {
        await CategoryModel.deleteOne({ _id: _id })
        return res.json({message: "category has been deleted"})
    } catch (error) {
        return res.json(error)
    }
}


export{
    create_category,
    get_categories,
    update_category,
    delete_category
}