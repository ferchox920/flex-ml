import {
  HttpException,
  HttpStatus,
  Injectable,

} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminEntity } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/utils/common/roles-enum';
import { LoginAdminDto } from './dto/login-admin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private config: ConfigService,
  ) {}


  async create(createAdminDto: CreateAdminDto): Promise<AdminEntity> {

 
    if (createAdminDto.key !== this.config.get('KEY')) {
      throw new Error('Invalid key');
    }

    const existingAdmin = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new HttpException('The admin is already registered.', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const newAdmin = this.adminRepository.create({
      ...createAdminDto,
      roles: Roles.ADMIN,
      password: hashedPassword,
    });
    return await this.adminRepository.save(newAdmin);
  }

  async login(loginAdminDto: LoginAdminDto) {
    const { email, password } = loginAdminDto;
    if(loginAdminDto.type!= Roles.ADMIN){
      throw new HttpException('Credenciales incorrectas!', HttpStatus.UNAUTHORIZED);
	  }
    try {
      const admin = await this.adminRepository.findOne({
        where: {
          email,
        },
      });

      if (!admin) {
        throw new HttpException('Credenciales incorrectas!', HttpStatus.UNAUTHORIZED);
      }
      const isPasswordMatching = await bcrypt.compare(password, admin.password);
      if (!isPasswordMatching) {
        throw new HttpException('Credenciales incorrectas!', HttpStatus.BAD_REQUEST);
      }
      return admin;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Error al iniciar sesión', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
