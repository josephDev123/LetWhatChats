import { options } from "joi";
import { Model, Schema, model } from "mongoose";

type optionFormatType = {
  option: string;
  count: number;
};

type SchemaType = {
  question: string;
  options: optionFormatType[];
  multiple_answer: boolean;
};

const pollingSchema = new Schema<SchemaType>({
  question: String,
  options: [{ option: String, count: { type: Number, default: 0 } }],
  multiple_answer: Boolean,
});

export const PollModel = model<SchemaType>("Poll", pollingSchema);
