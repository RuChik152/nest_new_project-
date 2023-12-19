import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { User } from "../../user/entities/user.schema";
import * as mongoose from "mongoose";
import { Achievement } from "../../achievement/entities/achievement.schema";

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
    type: Number,
    default: 0
  })
  gold: number;

  @Prop({
    type: Number,
    default: 0
  })
  score: number;

  @Prop({
    type: Number,
    default: 0,
  })
  kill: number

  @Prop({
    type: Number,
    default: 0,
  })
  game_time: number

  @Prop({
    type: Number,
    default: 0,
  })
  max_damage: number

  @Prop({
    type: Number,
    default: 0,
  })
  victory: number

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  })
  left_golem: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  right_golem: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }]})
  achievements: Achievement[]

}

export const DeviceSchema = SchemaFactory.createForClass(Device);
