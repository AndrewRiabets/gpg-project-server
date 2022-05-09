import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reportSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    nameCompany: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    taxSystem: {
      type: String,
      required: true,
    },
    emplBeginMonth: {
      type: Number,
      required: true,
    },
    emplEndMonth: {
      type: Number,
      default: "",
    },
    firstSalaryDay: {
      type: Number,
      default: "",
    },
    secondSalaryDay: {
      type: Number,
      default: "",
    },
    firstHalfStatement: {
      type: Date,
      default: "",
    },
    secondHalfStatement: {
      type: Date,
      default: "",
    },
    primaryDocCompleted: {
      type: Date,
      default: "",
    },
    firstHalfToRegVAT: {
      type: Number,
      default: "",
    },
    firstHalfRegistratedVAT: {
      type: Number,
      default: "",
    },
    secHalfToRegVAT: {
      type: Number,
      default: "",
    },
    secHalfRegistratedVAT: {
      type: Number,
      default: "",
    },
    paidSalaryFirstHalf: {
      type: Date,
      default: "",
    },
    createdPayFirstHalf: {
      type: Date,
      default: "",
    },
    paidSalarySecondtHalf: {
      type: Date,
      default: "",
    },
    createdPaySecondtHalf: {
      type: Date,
      default: "",
    },
    newTaxInfo: {
      type: mongoose.SchemaTypes.Mixed,
    },
    newReportInfo: {
      type: mongoose.SchemaTypes.Mixed,
    },
    closeMonth1c: {
      type: Date,
      default: "",
    },
    finaceResult: {
      type: Date,
      default: "",
    },
    amountPaymentOrders: {
      type: Number,
      default: "",
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
    toObject: { virtuals: true },
  }
);

const Report = model("Report", reportSchema);
export default Report;
