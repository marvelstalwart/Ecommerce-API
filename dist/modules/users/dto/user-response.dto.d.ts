export declare class UserResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    shoppingCartId: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    constructor(partial: Partial<UserResponseDto>);
}
