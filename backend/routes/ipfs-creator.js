let express = require('express');
let myfunc = require('../export/export.js');
let router = express.Router();
const fs = require('fs');

router.route('/create').post(async(req, res)=>{

    const file = req.files.image;
    const newpath = __dirname + "/files/";
    const filename = file.name;
    let imagePath = newpath+"//"+filename;

    try {
        if (!fs.existsSync(imagePath)) {
            file.mv(`${newpath}${filename}`, (err) => {
                if (err) {
                    console.log("error");
                    res.status(500).send({ message: "File upload failed", code: 200 });
                }
            });        
        }
    } catch(err) {
        console.error(err)
    }

    console.log("********** Hash Image ***********");
    let hashForImage = await myfunc.pinImageToIPFS(imagePath);
    console.log(hashForImage);
    let data = {
        url: hashForImage,
        fn: filename
    }
    console.log(data);
    res.json(data);
})

router.route('/load').post(async(req, res) => {
    const file = req.files.image;
    const newpath = __dirname + "\\files\\";
    const filename = file.name;
    let imagePath = newpath+"\\"+filename;

    try {
        if (!fs.existsSync(imagePath)) {
            file.mv(`${newpath}${filename}`, (err) => {
                if (err) {
                    console.log("error");
                    res.status(500).send({ message: "File upload failed", code: 200 });
                }
            });
        }
    } catch(err) {
        console.error(err);
    }

    console.log(imagePath);
    res.json({});
})

module.exports = router;