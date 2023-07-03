import { Router } from "express"
import upload_image from "../controller/UploadController.js"

const uploadRoute = Router()

uploadRoute.post('/test_image', upload_image)

export default uploadRoute