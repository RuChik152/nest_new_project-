import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Device } from "../../device/entities/device.schema";
import { HydratedDocument } from "mongoose";

export type AchievementDocument = HydratedDocument<Achievement>

@Schema({
  timestamps: true
})
export class Achievement {
  @Prop({
    type: String
  })
  name: string

  @Prop({
    type: Object
  })
  condition: any

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Device'}]})
  participants: Device[]
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement)