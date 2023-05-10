import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserMailerDocument = HydratedDocument<User>

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
    default: 'Not selected',
    required: false
  })
  platform?: string

  @Prop({
    default: false,
  })
  sendstatus?: boolean

}

export const MailerUserSchema = SchemaFactory.createForClass(User)