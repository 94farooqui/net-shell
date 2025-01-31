const getAllHosts = async (req, res) => {
    console.log("Hosts request")
    return res.status(200).send("Hello")
}

module.exports = {getAllHosts}