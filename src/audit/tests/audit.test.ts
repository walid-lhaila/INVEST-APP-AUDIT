import { Test, type TestingModule } from '@nestjs/testing';
import { AuditService } from '../audit.service';
import type { Model } from 'mongoose';
import { Audit } from '../entity/audit.entity';
import { getModelToken } from '@nestjs/mongoose';

describe('AuditService', () => {
  let service: AuditService;
  let auditModel: Model<Audit>;

  const mockAuditInstance = {
    save: jest.fn(),
  };

  const mockAuditModel = jest.fn().mockImplementation(() => mockAuditInstance);

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditService,
        {
          provide: getModelToken(Audit.name),
          useValue: mockAuditModel,
        },
      ],
    }).compile();

    service = module.get<AuditService>(AuditService);
    auditModel = module.get<Model<Audit>>(getModelToken(Audit.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('logAudit', () => {
    it('should create a new audit log', async () => {
      const auditData = {
        requestId: '123',
        rejectedBy: 'user1',
        timestamp: new Date().toISOString(),
      };

      const mockAudit = {
        ...auditData,
        _id: 'some-id',
      };

      mockAuditInstance.save.mockResolvedValue(mockAudit);

      const result = await service.logAudit(auditData);

      expect(mockAuditModel).toHaveBeenCalledWith(auditData);

      expect(mockAuditInstance.save).toHaveBeenCalled();

      expect(result).toEqual(mockAudit);
    });
  });
});
