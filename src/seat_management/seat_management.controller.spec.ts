import { Test, TestingModule } from '@nestjs/testing';
import { SeatManagementController } from './seat_management.controller';

describe('SeatManagementController', () => {
  let controller: SeatManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatManagementController],
    }).compile();

    controller = module.get<SeatManagementController>(SeatManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
