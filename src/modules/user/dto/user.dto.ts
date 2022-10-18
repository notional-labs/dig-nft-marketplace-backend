import { Socials } from "../interfaces/user.interfaces";

export class CreateUserDto {
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

export class ConnectUserDto {
    address: string;
}