import { Document, Schema, Types, model } from "mongoose";

export interface ITask extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
  status: "Pending" | "In-Progress" | "Completed";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Completed"],
      default: "Pending",
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const TaskModel = model<ITask>("Task", TaskSchema);
