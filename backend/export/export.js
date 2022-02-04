const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const recursive = require('recursive-fs');
const basePathConverter = require('base-path-converter');
const dotenv = require('dotenv').config().parsed;
const PIN_API_KEY = "d2ef1f62cd30e2655fbe";
const PIN_API_SECRET = "d30fdd53aca2881f6ad12b1839167487b13ae1c7c39e9dfc006ba4e4c0d67436";
let hashFlag = [];
module.exports.pinImageToIPFS = async(path) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //we gather a local file for this example, but any valid readStream source will work here.

    let data = new FormData();
    data.append('file', fs.createReadStream(path));
    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios.post(url, data, {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: PIN_API_KEY,
            pinata_secret_api_key: PIN_API_SECRET
        }
    }).then(function (res) {
        // console.log(res.data.IpfsHash);
        let hash = res.data.IpfsHash;
        // if(hash == null || hash == undefined) return null;
        // if(hashFlag[hash] !== undefined) return null;
        // hashFlag[hash] = 'OK';
        return hash;
    }).catch(function (err) {
        return null;
    });
};

module.exports.pinFolderToIPFS = async(path) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    console.log(path);
    recursive.readdirr(path, function async (err, dirs, files) {
        let data = new FormData();
        // console.log(files);
        files.map((file) => {
            data.append(`file`, fs.createReadStream(file),{
                filepath: basePathConverter(path, file)
            })
        });

        return axios.post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: PIN_API_KEY,
                pinata_secret_api_key: PIN_API_SECRET
            }
        }).then(function (res) {
            console.log(res.data);
            let hash = res.data.IpfsHash;
            console.log(hash);
            // if(hash == null || hash == undefined) return null;
            // if(hashFlag[hash] !== undefined) return null;
            // hashFlag[hash] = 'OK';
            return hash;
        }).catch(function (err) {
            return null;
        });
    });

};

module.exports.pinJSONToIPFS = (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;    
    return axios.post(url, JSONBody, {            
        headers: {                
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: PIN_API_KEY,
            pinata_secret_api_key: PIN_API_SECRET
    }        
    }).then(function (response) {            
        //handle response here        
    }).catch(function (error) {            
        //handle error here        
    });
};