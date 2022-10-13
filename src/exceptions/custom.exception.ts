import { HttpException } from "@nestjs/common";

export class CustomException extends HttpException {
    constructor(message: string, statuscode: number) {
        super(message, statuscode);
    }
}