import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Audit extends Document {
  @Prop({ required: true })
  requestId: string;

  @Prop({ required: true })
  rejectedBy: string;

  @Prop({ required: true })
  timestamp: string;
}

export type AuditDocument = Audit;
export const AuditSchema = SchemaFactory.createForClass(Audit);
