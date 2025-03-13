// auth/auth.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserRole } from '../entities/user-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userData: {
    email: string;
    password: string;
    role?: UserRole;
    firstName: string;
    lastName: string;
  }) {
    console.log('📩 Received userData:', userData); // 👀 Log what is received from frontend

    // Validate role
    const role =
      userData.role && Object.values(UserRole).includes(userData.role)
        ? userData.role
        : UserRole.USER;

    // Check if user exists
    const existingUser = await this.userService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    console.log('📌 Creating user with:', {
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role,
    });

    // Create new user
    const newUser = await this.userService.create({
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role,
    });

    console.log('✅ Saved user:', newUser); // 👀 Check stored data

    if (!newUser.id) {
      throw new Error('User ID not returned after creation');
    }

    // Generate JWT token
    const payload = {
      email: newUser.email,
      userId: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
    };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      userId: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  async login(credentials: { email: string; password: string }) {
    const user = await this.validateUser(
      credentials.email,
      credentials.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      userId: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
