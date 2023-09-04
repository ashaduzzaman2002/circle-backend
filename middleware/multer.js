
const multer = require('multer')
// import multer from 'multer'
// import fs from 'fs'
// import { dirname } from 'path'
// import path from 'path'
// import { fileURLToPath } from 'url'

// import Utils from './Utils'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const publicFileUrl = path.join(__dirname, '..')
// // console.log(path.join(__dirname, '..', 'public'))

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const destinationPath = path.join(__dirname, '..', 'public', 'uploads');
//         cb(null, destinationPath);
//     },
//     filename: function (req, file, cb) {
//         const index = (file.originalname as string).lastIndexOf('.')
//         const ext = (file.originalname as string).slice(index)

//         const filename = generateId() + ext
//         cb(null, filename);
//     }
// })

// export const upload = multer({ storage: storage })
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        const index = file.originalname.lastIndexOf('.')
        const ext = file.originalname.slice(index)

        const filename = generateId() + ext

        console.log(filename)
        cb(null, filename);
    }
})

exports.upload = multer({ storage: storage })


function generateId(max = 30) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let tempId = ''
    for (let index = 0; index < max; index++) {
        const i = Math.floor(Math.random() * characters.length)
        tempId += characters[i]
    }

    return tempId
}