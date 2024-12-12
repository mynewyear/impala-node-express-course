const { people } = require("../data.js");

const logOn = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: "Provide a name" });
    }

    // Check if the person exists
    const person = people.find(person => person.name === name);
    if (!person) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.cookie("name", name);
    res.status(201).json({ success: true, message: `Hello ${name}` });
};

const logOff = (req, res) => {
    res.clearCookie("name");
    res.status(200).json({ success: true, message: "You were logged out" });
};

const test = (req, res) => {
    res.status(200).json({ success: true, message: `Welcome ${req.user}` });
};

module.exports = {
    logOn,
    logOff,
    test,
};
