import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Response,
  Param,
  Query,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { EcommercesService } from './ecommerces.service';
import { CreateEcommerceDto } from './dto/create-ecommerce.dto';
import { JwtPayload } from '../auth/interface/jwt-payload.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ecommerces')
export class EcommercesController {
  constructor(private readonly ecommercesService: EcommercesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: Request & { user: JwtPayload },
    @Body() createEcommerceDto: CreateEcommerceDto,
  ) {
    return this.ecommercesService.createEcommerce(
      req.user.id,
      createEcommerceDto,
    );
  }
  @Post('create-code')
  async createCode(@Response() res, @Body() id: string) {
    try {
      const fallbackWebURL = await this.ecommercesService.createUrl(id);
      res.redirect(fallbackWebURL);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/code')
  async getCode(
    @Query() params: { params: string; code: string },
  ) {
    try {
      const result = await this.ecommercesService.getCode(params);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('Ecommerce not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get()
  findAll() {
    return this.ecommercesService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.ecommercesService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateEcommerceDto: UpdateEcommerceDto) {
    //   return this.ecommercesService.update(+id, updateEcommerceDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.ecommercesService.remove(+id);
  }
}
