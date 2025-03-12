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
          host: '127.0.0.1',
          port: 7000,
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
