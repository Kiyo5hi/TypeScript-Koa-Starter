import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Joi from "joi";

export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (candidatePassword: string) => Promise<boolean>;

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {timestamps: true});

/**
 * Password hash middleware.
 */
userSchema.pre("save", async function save(next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) {
        await next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await next();
    } catch (e) {
        await next(e);
    }
});

const comparePassword: comparePasswordFunction = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);

export const userJoiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,}$")).required()
});
