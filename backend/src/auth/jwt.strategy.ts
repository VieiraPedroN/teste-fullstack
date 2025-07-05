import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

type JwtPayload = {
  sub: string;
  email: string;
  tipo: 'ADMIN' | 'USER';
};

type JwtUser = {
  id: string;
  email: string;
  tipo: 'ADMIN' | 'USER';
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();

    super({
      jwtFromRequest: (req: Request) => jwtExtractor(req),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'chave-secreta',
    });
  }

  validate(payload: JwtPayload): JwtUser {
    return {
      id: payload.sub,
      email: payload.email,
      tipo: payload.tipo,
    };
  }
}
