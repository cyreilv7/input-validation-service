# input-validation-service
CS 361 Microservice for validating user input to partner's weather app

## To run the service locally:
1. `git clone` this project
2. Run `npm install` to install the project dependencies
3. Go to https://app.zipcodestack.com/ and register for an API key
4. Create a .env file in the root directory of the project and add a line that says:
   - `ZIPCODESTACK_API_KEY="<YOUR API KEY>"`
5. Run `npm start`     

## Example API request
```
function processData(data) {
    // insert whatever logic for processing data
    console.log(data);
}

async function validateZipcode() {
    const url = `http://localhost:${3000 || process.env.PORT}/api/validateInput?zipcode=01851`;
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
```

## UML Diagram
<img src="https://github.com/cyreilv7/input-validation-service/blob/main/assets/uml%20sequence%20diagram.jpeg" width="800">
