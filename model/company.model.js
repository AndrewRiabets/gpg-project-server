import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const companySchema = new Schema(
  {
    owner: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  
    name: {
      type: String,
      unique: true,
    },
  },
  { 
    versionKey: false,
    toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      return ret;
    },
  },
  toObject: { virtuals: true },}
);

const Company = model("Company", companySchema);
export default Company;
