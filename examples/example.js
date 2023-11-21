function processData(data) {
    // insert whatever logic for processing data
    console.log(data);
}

async function validateZipcode() {
    const url = `http://localhost:${3000 || process.env.PORT}/api/validateInput?zipcode=dfsfnfsd`;
    const options = {
        method: 'GET',
    }
    return await fetch(url, options)
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
        throw Error(err.message);
    })
}

const zipcode = await validateZipcode('01581');
processData(zipcode);