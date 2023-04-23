import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);

    if (users.length) throw new BadRequestException('user already exists');

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;

    return this.userService.createUser(email, result);
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) throw new NotFoundException('user does not exists');

    const [salt, hash] = user.password.split('.');

    const newHash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash !== newHash.toString('hex')) throw new UnauthorizedException();

    return user;
  }
}
