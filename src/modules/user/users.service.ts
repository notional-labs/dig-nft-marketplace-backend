import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(user: CreateUserDto): Promise<User> {
        const newUser = new this.userModel({
            address: user.address,
            name: user.name,
            description: user.description,
            socials: {
                web: user.socials.web,
                twitter: user.socials.twitter,
                instagram: user.socials.instagram,
                facebook: user.socials.facebook,
                behance: user.socials.behance,
            },
            joinDate: new Date(Date.now())
        })

        return newUser.save()
    }

    async update(user: UpdateUserDto, address:  string): Promise<User> {
        return await this.userModel.findOneAndUpdate({ address: address }, user)
    }

    async findByAddress(address: string): Promise<User> {
       return await this.userModel.findOne({ address: address }).exec()
    }
}