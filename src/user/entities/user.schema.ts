import {HydratedDocument} from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Device } from "../../device/entities/device.schema";
import * as mongoose from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({
  timestamps: true
})
export class User {

  @Prop()
  email: string

  @Prop()
  name: string

  @Prop({
    type: String,
    default: "anonymous",
    maxlength: 16
  })
  nickname: string

  @Prop({
    type: String,
    default: 'Not selected',
    required: false
  })
  platform?: string

  @Prop({
    type: Number,
    default: 0,
  })
  DEV?: number

  @Prop({
    default: false,
  })
  sendstatus?: boolean

  @Prop()
  auth_data:any[]

  @Prop({
    default: false,
    required: false
  })
  news: boolean

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  })
  device: Device

}

export const UserSchema = SchemaFactory.createForClass(User)
