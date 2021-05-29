const express = require('express');
const router = express.Router();

// To upload a image in fabric folder
router.post('/', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'Error: No file uploaded'
            });
        } else {
            let uploadedFile = req.files.file;
            uploadedFile.mv('../public/images/color/' + uploadedFile.name);
            res.json({
                message: 'File is uploaded',
                data: {
                    name: uploadedFile.name,
                    mimetype: uploadedFile.mimetype,
                    size: uploadedFile.size
                }
            });
        }
    } catch (err) {
        res.json({ Error: "Error while uploading file." })
    }
});

module.exports = router;