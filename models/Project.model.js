const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  repositoryLink: { type: String },
  projectFolder: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: { type: Schema.Types.ObjectId, ref: "User" },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
