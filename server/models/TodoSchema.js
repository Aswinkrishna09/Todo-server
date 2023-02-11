import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  taskname: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;