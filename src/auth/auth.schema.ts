import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type AdminAuthDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  name: string;
}

export const AdminUserSchema = SchemaFactory.createForClass(User);

// AdminUserSchema.pre('save', async function (next) {
//   const hash = await bcrypt.hash(this.password, 20);
//   this.password = hash;
//   next();
// });
