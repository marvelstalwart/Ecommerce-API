export declare function hashPassword(password: string): Promise<string>;
export declare function comparePasswords(plain: string, hashed: string): Promise<boolean>;
