export interface SigninUserDtoType {
  email: string;
  password: string;
}

export interface SignupUserDtoType extends SigninUserDtoType {
  firstName: string;
  lastName: string;
}

export interface UserEntityType extends SignupUserDtoType {
  id: string;
  hashPassword(): Promise<void>;
  getHashPassword(): Promise<string>;
  verifyPassword(value: string): Promise<boolean>;
}
