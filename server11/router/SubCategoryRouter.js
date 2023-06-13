import { Router } from "express"
import {
    create_subcategory,
    get_subcategories,
    update_subcategory,
    delete_subcategory,
    get_product_by_subcategory
} from '../controller/SubCategoryController.js'

const subcategoryRouter = Router()

subcategoryRouter.post('/create_subcategory', create_subcategory)
subcategoryRouter.get('/get_subcategories', get_subcategories)
subcategoryRouter.put('/update_subcategory', update_subcategory)
subcategoryRouter.delete('/delete_subcategory', delete_subcategory)
subcategoryRouter.get('/find_by_subcategory_id/:_id', get_product_by_subcategory)

export default subcategoryRouter