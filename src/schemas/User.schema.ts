import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserSettings } from "./UserSettings.schema";
import mongoose from "mongoose";

//Definimos el esquema de usuario, representa la forma en que se va a guardar en la base de datos.
// la colección se llama users.
@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop()
    displayName?: string;

    @Prop()
    avatarUrl?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
    settings?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);