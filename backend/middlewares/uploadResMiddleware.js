const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null, 'uploads/restaurant');
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

// filter function to allow only image files

const fileFilter = (req,file,cb)=>{
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if(extname && mimetype){
        return cb(null,true);
    } else {
        cb('Error: File upload only supports images!');
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // limit to 5MB
    fileFilter: fileFilter
});

module.exports = upload;