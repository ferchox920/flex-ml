import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserEntity })
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({ status: 200, description: 'Returns all users.', type: [UserEntity] })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Uncomment these lines if needed
  // @ApiResponse({ status: 200, description: 'Returns a single user by ID.', type: UserEntity })
  // @ApiParam({ name: 'id', description: 'User ID' })
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: UserEntity })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({ status: 204, description: 'The user has been successfully deleted.' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
