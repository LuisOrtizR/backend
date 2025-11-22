import { IsOptional, IsEnum } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class OrderFiltersDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
