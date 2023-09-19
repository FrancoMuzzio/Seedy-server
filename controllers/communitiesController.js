const { Community } = require("../models");

exports.communities = async (req, res) => {
    try {
        const communities = await Community.findAll();
        res.status(200).send(communities);
    } catch (error) {
        console.error("Error fetching communnities:", error);
        res.status(500).send({ message: "Error fetching communnities" });
    }
}
