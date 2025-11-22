import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderFiltersDto } from './dto/order-filters.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReqUser } from '../auth/req-user.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Crear pedido (cliente)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@ReqUser() user: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(user.userId, dto);
  }

  // Listar pedidos (admin)
  @Get()
  findAll(@Query() query: OrderFiltersDto) {
    return this.ordersService.findAll(query);
  }

  // Ver un pedido
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  // Mis pedidos (cliente)
  @UseGuards(JwtAuthGuard)
  @Get('me/list')
  findMyOrders(@ReqUser() user: any) {
    return this.ordersService.findMyOrders(user.userId);
  }

  // Actualizar estado (admin)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto);
  }
}
