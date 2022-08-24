const express = require("express");
require("../db/conn");
const user = require("../models/user.models");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/updatepassword", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).json({ error: "Please Enter all Fields" })
    } else {
        try {
            const fetchEmail = await user.findOne({ email: email });

            if (fetchEmail) {
                const hashPass = await bcrypt.hash(password, 12);

                const update = await user.findOneAndUpdate({ email: email }, { password: hashPass }, { new: true });

                if (update) {
                    return res.status(200).json({ message: "Password Changed Successfully" });
                } else {
                    return res.status(500).json({ error: "Some Error Ocuurred" })
                }
            } else {
                return res.status(404).json({ error: "Email not Found" })
            }
        } catch (error) {
            console.log(error);
        }
    }

})

module.exports = router