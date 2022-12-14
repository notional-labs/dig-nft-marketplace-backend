import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    address: string;

    @Prop({ default: 'unamed' })
    name: string;

    @Prop()
    description: string;

    @Prop()
    logo: string;

    @Prop()
    banner: string;

    @Prop(raw({
        facebook: { type: String, default: '' },
        website: { type: String, default: '' },
        twitter: { type: String, default: '' },
        instagram: { type: String, default: '' },
        behance: { type: String, default: '' },
    }))
    socials: Record<string, any>;

    @Prop()
    joinDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);