const validateInput = (req, res) => {
    if (req.query.message.includes('good morning')) {
        res.status(200).send('good morning');
    } else {
        res.status(500).send('Message was not good morning :(')
    }
}

export { validateInput }