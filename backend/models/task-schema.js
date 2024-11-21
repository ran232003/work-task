const mongoose = require("mongoose");
const Counter = require("./counter-schema");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    businessImpacts: {
      type: String,
    },
    assignee: {
      type: String,
      required: true,
    },

    priority: String,
    reporter: { type: String, required: true },
    attachments: [],
    description: String,
    summary: String,
    issue: String,
    project: String,
    deliveryDate: Date,
    fixDescription: {
      type: String,
      default: "",
    },
    rootCause: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Open",
    },
    comments: [],
    sequence: { type: String, unique: true }, // Add sequence field
  },
  { timestamps: true }
);
// Pre-save hook to generate sequence
taskSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "taskSequence" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );

      this.sequence = `OS-${counter.sequence_value}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
