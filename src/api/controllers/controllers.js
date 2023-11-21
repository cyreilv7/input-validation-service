import 'dotenv/config';
import fetch from 'node-fetch';
import chalk from 'chalk';

const API_KEY = process.env.ZIPCODESTACK_API_KEY;

function normalize(zipcode) {
    const normalizedZip = zipcode.trim();
    return normalizedZip;
}

function showError(err) {
    console.error(chalk.red(`ERROR: ${err.message}`));
}

async function isValidZipcode(zipcode) {
    if (!API_KEY) {
        throw Error('Invalid API Key');
    }
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
            throw Error(err.message);
        })
}

async function validateInput (req, res) {
    if (req.query.zipcode) {
        try {
            const isValid = await isValidZipcode(req.query.zipcode);
            const data = {
                'isValidZipCode': isValid
            }
            res.status(200).json(data);
        } catch (err) {
            showError(err);
            res.status(500).send("Internal server error");
        }
    } else {
        res.status(400).send("Invalid request. Please check that the request's zipcode param or the API key is valid.");
    }
}

export { validateInput, isValidZipcode }