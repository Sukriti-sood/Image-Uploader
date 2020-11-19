const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});
const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route("/")
.post(upload.single("image"),(req,res)=>{
    res.statusCode=200;
    res.setHeader("Content-type","application/json");
    res.json({"url":"https://localhost:5000/uploader/"+req.file.originalname});
})
uploadRouter.route("/:imagename")
.get((req,res)=>{
    res.sendFile(__dirname+"/public/images/"+req.params.imagename);
});

module.exports=uploadRouter;