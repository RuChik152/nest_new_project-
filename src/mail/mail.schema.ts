import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserMailerDocument = HydratedDocument<MailUser>

@Schema({
  timestamps: true
})
export class MailUser {
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

  @Prop()
  auth_data:any[]

  @Prop({
    default: false,
    required: false
  })
  news: boolean

}

export const MailerUserSchema = SchemaFactory.createForClass(MailUser)