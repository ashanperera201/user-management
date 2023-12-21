import { compare, genSalt, hash } from 'bcryptjs';
import { IPasswordHash } from '../interfaces/password-hash.interface';

export const hashPassword = async (password: string): Promise<IPasswordHash> => {
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    return {
        passwordHash: passwordHash,
        passwordSalt: salt
    };
};

export const passwordCompare = async (userPasswordInput: string, hashedPassword: string): Promise<boolean> => {
    return await compare(userPasswordInput, hashedPassword);
}