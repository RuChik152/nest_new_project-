import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";


export type AdminPanelUserDocument = HydratedDocument<AdminPanelUser>;
@Schema({
  timestamps: true
})
export class AdminPanelUser {

  @Prop({required: true})
  login: string

  @Prop({required:true})
  pass: string

  @Prop({
    type:[String],
    required: false,
    default: ['user']
  })
  group?: string[]
}

export const AdminPanelUserSchema = SchemaFactory.createForClass(AdminPanelUser)

AdminPanelUserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.pass, 10)
  this.pass = hash;
  next();
})