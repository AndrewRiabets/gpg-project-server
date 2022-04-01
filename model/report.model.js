import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reportSchema = new Schema(
  {
    //   userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    //   companyId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Company",
    //     required: true,
    //   },
    generalInfo: {
      dateReport: {
        type: String,
        default: Date.now,
      },
      taxationSystems: {
        type: String,
        required: true,
      },
      employeeBeginingMonth: {
        type: Number,
        required: true,
      },
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

const Report = model("Report", reportSchema);
export default Report;
