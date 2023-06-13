import { Router } from "express"
import {
    create_product,
    get_products,
    update_product,
    delete_product
} from '../controller/ProductController.js'

const productRouter = Router()

productRouter.post('/create_product', create_product)
productRouter.get('/get_products', get_products)
productRouter.put('/update_product', update_product)
productRouter.delete('/delete_product', delete_product)

export default productRouter