import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { ShippingEntity } from './entities/shipping.entity';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  async findAll(): Promise<ShippingEntity[] | Error> {
    try {
      const allShipping = await this.shippingService.getAllShipping();
      return allShipping;
    } catch (error) {
      console.error('Error retrieving all shipping:', error.message || error);
      throw new Error('Error retrieving all shipping');
    }
  }

  @Get(':id')
  async getShippingById(
    @Param('id') id: string,
  ): Promise<ShippingEntity | null | Error> {
    try {
      const shipping = await this.shippingService.getShippingById(id);
      return shipping;
    } catch (error) {
      console.error('Error retrieving shipping by id:', error.message || error);
      throw new Error('Error retrieving shipping by id'); 
    }
  }

  @Get('/byIdMl/:idMl')
  async getShippingByIdMl(
    @Param('idMl') idMl: string,
  ): Promise<ShippingEntity | null | Error> {
    try {
      const shipping = await this.shippingService.getShippingByIdMl(idMl);
      return shipping;
    } catch (error) {
      console.error(
        'Error retrieving shipping by idMl:',
        error.message || error,
      );
      throw new Error('Error retrieving shipping by idMl'); 
    }
  }
}
