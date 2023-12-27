const { User } = require("../models");

exports.edit = async (req, res) => {
    try {
        const { username, email, picture } = req.body;
        console.log(picture);
        const user = await User.findOne({ where: { id: req.params.user_id } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (picture) user.picture = picture;

        await user.save();

        res.status(200).send(user);
    } catch (error) {
        console.error("Error editing user:", error);
        res.status(500).send({ message: "Error editing user" });
    }    
};
