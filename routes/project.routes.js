const router = require("express").Router();
const Project = require("../models/Project.model");
const userId = "r7ujbbe6kiu";
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//Create a new project
router.post("/create", async (req, res) => {
  try {
    console.log("req body is :", req.body);
    if (Object.keys(req.body).length === 0) {
      res
        .status(500)
        .json(`invalid payload. Received: ${JSON.stringify(req.body)}`);
    } else {
      const NewProject = await Project.create({
        ...req.body,
        userId,
      });
      res.status(201).json(NewProject);
    }
  } catch (error) {
    res.send("Error occured, check payload");
    console.log("error occured while creating project: ", error);
    res.status(500).json(error);
  }
});
//POST: http://localhost:5005/project/create

// Get all projects for a specific user and populate comments
router.get("/userId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const projects = await Project.find({ userId: id }).populate("comments");
    res.status(200).json(projects);
  } catch (error) {
    console.log("error ocuured while getting projects: , error ");
    res.status(500).json(error);
  }
});
//Get: http://localhost:5005/project/userId/r7ujbbe6kiu

// Get a specific project by ID for a specific user and populate comments
router.get("/project/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId, { userId }).populate(
      "comments"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.log("error while getting project:", error);
    res.status(500).json({ error: "Error retrieving the project" });
  }
});
//Get: http://localhost:5005/project/project/64cd4cfc77dbd199a3d0dc77

// Update a project by ID
router.put("/update/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.log("error while updating  project:", error);
    res.status(500).json({ error: "Error updating the project" });
  }
});
//http://localhost:5005/project/update/64cd4cfc77dbd199a3d0dc77

//Delete a project by Id
router.delete("/delete/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndRemove(projectId);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(deletedProject);
  } catch (error) {
    res.status(500).json({ error: "Error deleting the project" });
  }
});

module.exports = router;
