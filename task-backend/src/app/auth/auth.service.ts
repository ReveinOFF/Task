import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import User from 'src/core/entities/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from 'src/core/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Method for user authorization
   *
   * @public
   * @param {AuthDto} auth - Email and password.
   * @returns {Promise<string>} - Authorization token.
   */
  async signin(auth: AuthDto): Promise<string> {
    try {
      const user = await this.userModel.findOne({
        where: { email: auth.email },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const userData = user.dataValues;
      const isAuth = await bcrypt.compare(auth.password, userData.password);

      if (!isAuth)
        throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);

      const token = this.generateToken(userData);

      return token;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error during user login',
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Method for user registration
   *
   * @public
   * @param {AuthDto} reg - Registration details.
   * @returns {Promise<string>} - Authorization token.
   */
  async signup(reg: AuthDto): Promise<string> {
    try {
      const user = await this.userModel.findOne({
        where: { email: reg.email },
      });

      if (user)
        throw new HttpException('Email is already taken', HttpStatus.CONFLICT);

      const hashedPassword = await bcrypt.hash(reg.password, 10);
      const newUser = await this.userModel.create({
        email: reg.email,
        password: hashedPassword,
      });

      if (!newUser)
        throw new HttpException(
          'Error in creating a user',
          HttpStatus.BAD_REQUEST,
        );

      const token = this.generateToken(newUser);

      return token;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error during user registration',
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Method for token generation
   *
   * @private
   * @param {User} user - User data.
   * @returns {string} - Authorization token.
   */
  private generateToken(user: User): string {
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return token;
  }
}
