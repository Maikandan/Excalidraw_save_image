const multer = require('multer');

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/');
    }, 
    filename: (req, file, callback) => {
        const ext = 'jpg'
        const imageName = file.originalname.split('.')[0];
        callback(null, `${imageName}.${ext}`);
    }
});

const upload = multer({
    storage: multerConfig
    // dest: 'public/'
});


exports.uploadImage = upload.single('photo');

exports.upload = (req, res) => {
    console.log(req.file);

    res.status(200).json({
        success: 'Success',
    });
}