import multer from 'multer'
import storage from "../multer.js"

const upload_image = async (req, res) => {
    let upload = multer({storage: storage}).any('image')
    upload(req, res, () => {
        return res.send(req.files)
    })
}


export default upload_image
