import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnalyticSchemaDocument = HydratedDocument<Analytic>;
@Schema()
export class Analytic {
  @Prop()
  email: string

  @Prop()
  name: string

  @Prop()
  sessionId: string

  @Prop()
  dataEvent: []

  @Prop()
  utm:[]


}

export const AnalyticSchema = SchemaFactory.createForClass(Analytic);