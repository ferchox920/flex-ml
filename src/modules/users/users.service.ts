import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    // if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async login(loginDto: any): Promise<UserEntity> {
    const { email, password } = loginDto;
    const userExisting = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email })
      .getOne();

    if (!userExisting) {
      throw new BadRequestException('User does not exist');
    }

    if (!userExisting) {
      throw new HttpException('Credenciales inválidas', HttpStatus.BAD_REQUEST);
    }

    const matchPassword = await bcrypt.compare(password, userExisting.password);

    if (!matchPassword) {
      throw new HttpException('Credenciales inválidas', HttpStatus.BAD_REQUEST);
    }

    return userExisting;
  }

  findAll() {
    return this.userRepository.find();
  }

  // findOne(id: string) {
  //   return this.userRepository.findOne(id);
  // }

  update(id: string, updateUserDto: UpdateUserDto) {
    // Lógica de actualización, por ejemplo:
    // return this.userRepository.update(id, updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    // Lógica de eliminación, por ejemplo:
    // return this.userRepository.delete(id);
    return `This action removes a #${id} user`;
  }
}
