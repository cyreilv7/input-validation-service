import 'dotenv/config';
import fetch from 'node-fetch'

const API_KEY = process.env;

function isValid(zip) {
    const url = `https://api.zipcodestack.com/v1/search?codes=${zip}&country=us`;
    const options = {
        method: 'GET',
        headers: {
            apiKey: API_KEY
        }
    }
    fetch(url, options)
        .then(res => {
            if (res.status == 200) {
                return true
            }
            return false;
        })
        .catch(err => {
            console.error('Error: ', err);
            return false;
        })
}

const validateInput = (req, res) => {
    if (req.query.zipcode) {
        const normalizedZip = req.query.zipcode.trim();
        if (isValid(normalizedZip)) {
            res.status(200).send('is valid');
        } else {
            res.status(400).send('is not valid');
        }
        
    } else {
        res.status(500).send('Invalid request, check query parameter for "zipcode" param`');
    }
}

export { validateInput }