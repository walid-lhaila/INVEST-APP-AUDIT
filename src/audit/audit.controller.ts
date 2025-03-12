import { Controller } from '@nestjs/common';
import { AuditService } from './audit.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @MessagePattern('audit-log')
  async handleAuditLog(@Payload() data: any) {
    return this.auditService.logAudit(data);
  }
}
