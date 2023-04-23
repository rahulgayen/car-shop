import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private authService: AuthService, private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return this.authService.signup(email, password);
  }
  @Post('/signin')
  @HttpCode(200)
  signin(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return this.authService.signin(email, password);
  }

  @Get(':id')
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException('Invalid User Id');
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
