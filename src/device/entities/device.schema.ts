import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { User } from "../../user/entities/user.schema";
import * as mongoose from "mongoose";
import { Achievement } from "../../achievement/entities/achievement.schema";
import { generateEmoji } from "../lib/library";

export type DeviceDocument = HydratedDocument<Device>

let code: string

@Schema()
export class Device {


  constructor() {
  }

  @Prop()
  deviceId: string;

  @Prop({
    length: 4,
    type: String,
    default: () => {
      const characters = "123456789ABCDEFGHIJKLMNPRSTUVWXYZ"
      let activateCode = "";
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        activateCode += characters[randomIndex];
      }
      code = activateCode;
      return activateCode;
    },
    required: false
  })
  activateCode: string;

  @Prop({
    type: String,
    default: "",
    required: false
  })
  emojiCode: string;



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
    default: -7,
  })
  victory: number

  @Prop({
    type: Number,
    default: 0,
  })
  tutorial: number

  @Prop({
    type: String,
    default: ""
  })
  platform: string

  @Prop({
    type: Number,
    default: 0,
  })
  kill_SPDR: number

  @Prop({
    type: Number,
    default: 0,
  })
  kill_SKLT: number
  @Prop({
    type: Number,
    default: 0,
  })
  kill_GHST: number

  @Prop({
    type: Number,
    default: 0,
  })
  kill_ANML: number

  @Prop({
    type: Number,
    default: 0,
  })
  kill_ANML_VPR: number

  @Prop({
    type: Number,
    default: 0,
  })
  kill_ANML_WLF: number

  @Prop({
    type: Number,
    default: 0,
  })
  kill_ANML_BEAR: number

  @Prop({
    type: Number,
    default: 0,
  })
  kill_ANML_DEER: number

  @Prop({
    type: Number,
    default: 0,
  })
  kill_KARGA: number

  @Prop({
    type: Number,
    default: 0,
  })
  DRG_DMG: number

  @Prop({
    type: Number,
    default: 0,
  })
  LOSE_LVL: number

  @Prop({
    type: Number,
    default: 0,
  })
  DSTR_STONES: number

  @Prop({
    type: Number,
    default: 0,
  })
  FRND_DMG: number

  @Prop({
    type: Number,
    default: 0,
  })
  FRND_KILL: number

  @Prop({
    type: Number,
    default: 0,
  })
  MSHRM: number

  @Prop({
    type: Number,
    default: 0,
  })
  GLD_CHST: number


  @Prop({
    type: Number,
    default: 2,
  })
  DO_SRVL: number

  @Prop({
    type: Number,
    default: 0
  })
  SRVL: number

  @Prop({
    type: Number,
    default: 0
  })
  SRVL_MAX: number

  @Prop({
    type: Number,
    default: 0,
  })
  CSTL: number

  @Prop({
    type: Number,
    default: 0,
  })
  s_duplex: number

  @Prop({
    type: Number,
    default: 0,
  })
  s_rain: number

  @Prop({
    type: Number,
    default: 0,
  })
  s_wind: number

  @Prop({
    type: Number,
    default: 0,
  })
  s_earthquake: number

  @Prop({
    type: Number,
    default: 0,
  })
  s_lightning: number

  @Prop({
    type: Number,
    default: 0,
  })
  s_DRG_fire: number

  @Prop({
    type: Number,
    default: 0,
  })
  s_DRG_healing: number

  @Prop({
    type: Number,
    default: 0,
  })
  s_mind_capture: number

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

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: null,
  })
  updatedAt: Date;

  @Prop({
    type: Number,
    default: 0,
  })
  DEV?: number

  @Prop({
    type: Number,
    default: 0,
  })
  LEFT_GOLEM_ABLC_SKLS_SPEED_UP?: number

  @Prop({
    type: Number,
    default: 0,
  })
  LEFT_GOLEM_ABLC_SKLS_UP_DMG?: number

  @Prop({
    type: Number,
    default: 0,
  })
  LEFT_GOLEM_ABLC_SKLS_RCCHT?: number

  @Prop({
    type: Number,
    default: 0,
  })
  LEFT_GOLEM_ABLC_SKLS_MGT?: number

  @Prop({
    type: Number,
    default: 0,
  })
  RIGHT_GOLEM_ABLC_SKLS_SPEED_UP?: number

  @Prop({
    type: Number,
    default: 0,
  })
  RIGHT_GOLEM_ABLC_SKLS_UP_DMG?: number

  @Prop({
    type: Number,
    default: 0,
  })
  RIGHT_GOLEM_ABLC_SKLS_RCCHT?: number

  @Prop({
    type: Number,
    default: 0,
  })
  RIGHT_GOLEM_ABLC_SKLS_MGT?: number

  @Prop({
    type: Number,
    default: 0,
  })
  ABLC_SKLS_FIRE?: number

  @Prop({
    type: Number,
    default: 0,
  })
  ABLC_SKLS_FIRE_TIME?: number

  @Prop({
    type: Number,
    default: 0,
  })
  ABLC_SKLS_HP?: number

  @Prop({
    type: Number,
    default: 0,
  })
  ABLC_SKLS_SHLD?: number

}

export const DeviceSchema = SchemaFactory.createForClass(Device);

DeviceSchema.pre("save", async function(next) {
  if (this.isNew) {
    const code = this.activateCode;
    const response = await generateEmoji(code)
    this.emojiCode = response.emoji
    this.createdAt = new Date()
    this.updatedAt = null
  }
  this.updatedAt = undefined;
  next()
})

DeviceSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
})

DeviceSchema.pre('updateOne', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});