import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as bcrypt from "bcrypt";


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

  @Prop({required:false})
  access_token?: string | null

  @Prop({required:false})
  refresh_token?: string | null
}

export const AdminPanelUserSchema = SchemaFactory.createForClass(AdminPanelUser)

AdminPanelUserSchema.pre("save", async function(next) {
  this.pass = await bcrypt.hash(this.pass, 10);
  next();
})