import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Audit, AuditSchema } from './entity/audit.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Audit.name, schema: AuditSchema }]),
    ClientsModule.register([
      {
        name: 'Audit-Service',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3005,
        },
      },
    ]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AuditModule {}
