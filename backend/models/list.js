const { Schema, model } = require("mongoose");

const listSchema = new Schema({
  listId: String,
  listName: String,
  totalQuestions: Number,
  solvedQuestions: Number,
  avgRating: Number,
  author: String,
  userRating: Number,
  problems: [
    {
      problemId: String,
      problemName: String,
      problemRating: Number,
      saveStar: Boolean,
      problemStatus: Boolean,
      tags: [{ tag: String }],
    },
  ],
});

module.exports = model("List", listSchema);
