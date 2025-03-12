import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Audit } from './entity/audit.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuditService {
  constructor(@InjectModel(Audit.name) private auditModel: Model<Audit>) {}

  async logAudit(data: any): Promise<Audit> {
    const auditLog = new this.auditModel(data);
    return auditLog.save();
  }
}
