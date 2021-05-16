import { Schema, Document, model } from "mongoose";

export interface Entity extends Document {
  id: string;
  productName: string;
  price: number;
  amountInStock: number;
  productDescription: string;
}

const EntitySchema: Schema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amountInStock: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String
  }
});

export default model<Entity>("Entity", EntitySchema);
