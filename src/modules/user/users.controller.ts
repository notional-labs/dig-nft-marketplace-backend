import { Controller, Get, Post, Body, Req, Res, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, ConnectUserDto } from './dto/user.dto';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) { }

  @Post()
  async connectAccount(
    @Body() ConnectUserDto: ConnectUserDto,
    @Res() res: Response
  ) {
    try {
      const user = await this.UsersService.connect(ConnectUserDto.address)
      res.status(200).json({
        status: 'success',
        data: user
      })
    }
    catch (e) {
      res.status(400).json({
        status: 'fail',
        message: e.message
      })
    }
  }

  @Post(':address')
  async create(
    @Body() CreateUserDto: CreateUserDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    try {
      const address = req.params.address
      const newUser = await this.UsersService.create(CreateUserDto, address)
      res.status(200).json({
        status: 'success',
        data: newUser
      })
    }
    catch (e) {
      res.status(400).json({
        status: 'fail',
        message: e.message
      })
    }
  }

  @Put(':address/edit')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    try {
      const address = req.params.address
      console.log(updateUserDto)
      await this.UsersService.update(updateUserDto, address)
      res.status(200).json({
        status: 'success',
      })
    }
    catch (e) {
      res.status(400).json({
        status: 'fail',
        message: e.message
      })
    }
  }

  @Get(':address')
  async findAll(
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const user = await this.UsersService.findByAddress(req.params.address)
      res.status(200).json({
        status: 'success',
        data: user
      })
    }
    catch (e) {
      res.status(400).json({
        status: 'fail',
        message: e.message
      })
    }
  }
}
