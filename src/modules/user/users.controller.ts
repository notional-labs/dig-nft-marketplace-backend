import { Controller, Get, Post, Body, Req, Res, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) { }

  @Post()
  async create(
    @Body() CreateUserDto: CreateUserDto,
    @Res() res: Response
  ) {
    const newUser = await this.UsersService.create(CreateUserDto)
    res.status(200).json({
      status: 'success',
      data: newUser
    })
  }

  @Put(':address/edit')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    const adddress = req.params.address
    await this.UsersService.update(updateUserDto, adddress)
    res.status(200).json({
      status: 'success',
    })
  }

  // @Get() 
  // async findAll(): Promise<Cat[]> {
  //   return this.UsersService.findAll();
  // }

  @Get(':address')
  async findAll(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const user = await this.UsersService.findByAddress(req.params.address)
    res.status(200).json({
      status: 'success',
      data: user
    })
  }
}
