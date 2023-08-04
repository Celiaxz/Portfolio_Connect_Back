const router = require("express").Router();
const Project = require("../models/Project.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//Create a new project
router.post("/", async (req, res) => {
  try {
    console.log("req body is :", req.body);
    const SavedProject = await Project.create(req.body);

    res.json(SavedProject);
  } catch (error) {
    res.send("Error occured, check payload");
    console.log("error occured while creating project: ", error);
  }
});

module.exports = router;
