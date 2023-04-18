import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GameSettingDocument = HydratedDocument<GameSetting>;

@Schema()
export class GameSetting {
  @Prop({ required: false })
  healthPoint: number;

  @Prop({ required: false })
  damage: number;

  @Prop({ required: false })
  shieldPoint: number;
}

export const GameSettingsSchema = SchemaFactory.createForClass(GameSetting);
