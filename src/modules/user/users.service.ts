import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async connect(address: string): Promise<User> {
        const user = await this.userModel.findOne({ address: address }).exec()
        console.log(user)
        if (user === null) {
            const newUser = new this.userModel({
                address: address,
                joinDate: new Date(Date.now())
            })

            return newUser.save()
        }

        return user
    }

    async create(user: CreateUserDto, address: string): Promise<User> {
        const findUser = await this.userModel.findOneAndUpdate({ address: address }, user, { new: true })

        return findUser
    }

    async update(user: UpdateUserDto, address: string): Promise<User> {
        const updateUser = await this.userModel.findOneAndUpdate({ address: address }, user, { new: true })
        return updateUser
    }

    async findByAddress(address: string): Promise<User> {
        return await this.userModel.findOne({ address: address }).exec()
    }
}