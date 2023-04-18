import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type AdminAuthDocument = HydratedDocument<AdminUser>;

@Schema()
export class AdminUser {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  name?: string;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);

AdminUserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 20);
  this.password = hash;
  next();
});
