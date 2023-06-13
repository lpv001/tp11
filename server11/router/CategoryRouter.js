import { Router } from "express"
import {
    create_category,
    get_categories,
    update_category,
    delete_category
} from '../controller/CategoryController.js'

const categoryRouter = Router()

categoryRouter.post('/create_category', create_category)
categoryRouter.get('/get_categories', get_categories)
categoryRouter.put('/update_category', update_category)
categoryRouter.delete('/delete_category', delete_category)

export default categoryRouter