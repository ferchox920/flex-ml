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
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('ecommerces')
@Controller('ecommerces')
export class EcommercesController {
  constructor(private readonly ecommercesService: EcommercesService) {}

  @ApiOperation({ summary: 'Create an ecommerce entity.' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Return the created ecommerce entity.' })
  @ApiBadRequestResponse({ description: 'Invalid data or missing required fields.' })
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

  @ApiOperation({ summary: 'Create a fallback URL for an ecommerce entity.' })
  @ApiResponse({ status: 302, description: 'Redirect to the created fallback URL.' })
  @ApiBadRequestResponse({ description: 'Invalid ecommerce ID.' })
  @Post('create-code')
  async createCode(@Response() res, @Body() id: string) {
    try {
      const fallbackWebURL = await this.ecommercesService.createUrl(id);
      res.redirect(fallbackWebURL);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Get code for an ecommerce entity.' })
  @ApiResponse({ status: 200, description: 'Return the code for the specified ecommerce entity.' })
  @ApiBadRequestResponse({ description: 'Invalid parameters or ecommerce not found.' })
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

  @ApiOperation({ summary: 'Get a list of all ecommerce entities.' })
  @ApiResponse({ status: 200, description: 'Return a list of ecommerce entities.' })
  @Get()
  findAll() {
    return this.ecommercesService.findAll();
  }
}
