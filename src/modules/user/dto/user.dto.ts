import { Socials } from "../interfaces/user.interfaces";
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    address: string;

    name: string;

    description: string;

    logo: string;

    banner: string;
    
    socials: Socials;
}

export class UpdateUserDto {
    name: string;
    description: string;
    logo: string;
    banner: string;
    socials: Socials;
}