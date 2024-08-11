import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'Qk1gM1vA3mOdK5QZp2Fz6nJ4u/1q+q5gL5YeV9HQhb7mt5IvkmK0RUcGV7F4AbdO', // Use the same secret as in AuthModule
    });
  }
  
  async validate(payload: any) {

    return { userId: payload.sub, username: payload.username, role: payload.role };

  }
}
