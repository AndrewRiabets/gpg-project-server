import mongoose from "mongoose";
import { Role } from "../helpers/constants";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const re = /^[a-zA-z_\d]{5,20}$/;
        return re.test(String(value).trim().toLocaleLowerCase());
      },
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: "Role is not allowed",
      },
      default: Role.ACC_USER,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    token: {
      type: String,
      default: null,
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

// TODO:

const User = model("User", userSchema);
export default User;
