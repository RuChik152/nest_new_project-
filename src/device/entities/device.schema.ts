import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { User } from "../../user/entities/user.schema";
import * as mongoose from "mongoose";

export type DeviceDocument = HydratedDocument<Device>

@Schema({
  timestamps: true,
})
export class Device {
  @Prop()
  deviceId: string;

  @Prop({
    length: 4,
    type: String,
    default: () => {
      const bytes = randomBytes(2);
      return bytes.toString('hex').toUpperCase();
    },
    required: false
  })
  activateCode: string;

  @Prop({
    default: 0
  })
  gold: number;

  @Prop({
    default: 0
  })
  score: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
