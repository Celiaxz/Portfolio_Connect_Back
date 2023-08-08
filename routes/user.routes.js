const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).populate("projects");
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/users/all", async (req, res, next) => {
  try {
    const userResponse = await User.find({});
    const users = [];
    userResponse.forEach((user) => {
      const userObject = {
        ...user._doc,
        username: undefined,
        password: undefined,
      };
      users.push(userObject);
    });
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/update/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(req)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      {new: true}
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "error updating user"})
  }
})

module.exports = router;
