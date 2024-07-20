
const test = (req, res) => {
    return res
        .status(400)
        .json({ message: "Username" });
};


module.exports = { test };