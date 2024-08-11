import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { jina } from 'src/shakti/Entity/ram.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([jina]), // Register the jina entity here
    JwtModule.register({
      secret: 'Qk1gM1vA3mOdK5QZp2Fz6nJ4u/1q+q5gL5YeV9HQhb7mt5IvkmK0RUcGV7F4AbdO', // Replace with your own secret
      signOptions: { expiresIn: '60m' }, // Adjust expiration as needed
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
