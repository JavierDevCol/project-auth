import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    users = [
        { id: 1, email: 'test@example.com', password:  bcrypt.hash('password', 10) }, // Contraseña hasheada
      ];

  constructor(private readonly jwtService: JwtService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find(user => user.email === email);
    if (user && (await bcrypt.compare(password, await user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
