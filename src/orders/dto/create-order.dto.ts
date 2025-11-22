import { IsArray, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  items: CreateOrderItemDto[];
}
