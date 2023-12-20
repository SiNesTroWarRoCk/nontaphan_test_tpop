import { Test, TestingModule } from '@nestjs/testing';
import { SeatManagementService } from './seat_management.service';

describe('SeatManagementService', () => {
  let service: SeatManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatManagementService],
    }).compile();

    service = module.get<SeatManagementService>(SeatManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
