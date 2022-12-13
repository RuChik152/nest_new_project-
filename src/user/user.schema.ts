import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  healthPoints: number;

  @Prop()
  gold: number;

  @Prop()
  experience: number;

  @Prop()
  level: number;

  @Prop()
  abilities: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
