//
const userRegister = (req, res) => {
    res.send('Register users');
};

//
const userLogins = (req, res) => {
    res.send('Login users');
};

//
module.exports = {
    userRegister,
    userLogins,
};
