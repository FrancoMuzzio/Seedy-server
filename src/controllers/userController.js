const { User } = require("../models");
const bcrypt = require("bcrypt");


exports.edit = async (req, res) => {
    try {
        const { username, email, picture } = req.body;
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

exports.changePassword = async (req, res) => {
    const user_id = req.user.id;

    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    user.password = await bcrypt.hash(req.body.newPassword, 10);

    await user.save();
  
    res.json({ message: "Password successfully updated" });
  };
