export class BaseClass {
    message: string;
    firstName: string;
    lastName: string;
}

export class UserLoginResponseDto extends BaseClass {
    accessToken: string;
}

export class ForgotPasswordResponseDto extends BaseClass {
    resetPasswordLink: string;
    email: string;
    userName: string;
}

export class ResetPasswordResponseDto extends BaseClass {
}

