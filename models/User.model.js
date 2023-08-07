const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    githubUsername: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },

    projects: [{
      type: Schema.Types.ObjectId,
      ref: "Project"
    }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    skills: [{
      type: String,
      trim: true,
    }],

    image: String,
    aboutMe: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
