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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('ecommerces')
@Controller('ecommerces')
export class EcommercesController {
  constructor(private readonly ecommercesService: EcommercesService) {}

  @ApiOperation({ summary: 'Create an ecommerce entity.' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Return the created ecommerce entity.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid data or missing required fields.',
  })
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

  @ApiOperation({ summary: 'Get fallback URL for an ecommerce entity by ID.' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'The ID of the ecommerce entity.',
    type: String,
  })
  @ApiResponse({ status: 302, description: 'Redirect to the fallback URL.' })
  @ApiBadRequestResponse({ description: 'Invalid ecommerce ID.' })
  @UseGuards(JwtAuthGuard)
  @Get('get-url/:id')
  async getUrlById(
    @Req() req: Request & { user: JwtPayload },
    @Param('id') id: string,
  ) {
    try {
      const url = await this.ecommercesService.getUrlById(req.user.id, id);
      return url;
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Get code for an ecommerce entity.' })
  @ApiResponse({
    status: 200,
    description: 'Return the code for the specified ecommerce entity.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameters or ecommerce not found.',
  })
  @Get('/code')
  async getCode(@Query() params: { id: string; code: string }) {
    try {
      const result = await this.ecommercesService.getCreate(params);
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Return a list of ecommerce entities.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('all-ecommerces')
  async findAllMyEcommerce(@Req() req: Request & { user: JwtPayload }) {
    return this.ecommercesService.findAllMyEcommerce(req.user.id);
  }
}
