import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({ status: 201, description: 'The admin has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid request body.' })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, description: 'Return all admins.' })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get an admin by ID' })
  @ApiResponse({ status: 200, description: 'Return the admin.', })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an admin by ID' })
  @ApiResponse({ status: 200, description: 'The admin has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiBadRequestResponse({ description: 'Invalid request body.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete an admin by ID' })
  @ApiResponse({ status: 200, description: 'The admin has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
