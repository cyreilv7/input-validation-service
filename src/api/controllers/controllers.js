import 'dotenv/config';
import fetch from 'node-fetch'

const API_KEY = process.env.ZIPCODESTACK_API_KEY;

function normalize(zipcode) {
    const normalizedZip = zipcode.trim();
    return normalizedZip;
}

async function isValidZipcode(zipcode) {
    zipcode = normalize(zipcode);
    const url = `https://api.zipcodestack.com/v1/search?codes=${zipcode}&country=us`;
    const options = {
        method: 'GET',
        headers: {
            apiKey: API_KEY
        }
    }
    return await fetch(url, options)
        .then(res => res.json())
        .then(data => Object.keys(data.results).length !== 0)
        .catch(err => {
            console.error('Error: ', err);
            return false;
        })
}

const validateInput = async (req, res) => {
    if (req.query.zipcode) {
        if (await isValidZipcode(req.query.zipcode)) {
            res.status(200).send('is valid');
        } else {
            res.status(400).send('is not valid');
        }
        
    } else {
        res.status(500).send('Invalid request, check query parameter for "zipcode" param');
    }
}

export { validateInput, isValidZipcode }