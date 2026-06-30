export interface SignupDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthUserDto {
  _id: string;
  name: string;
  email: string;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResultDto {
  user: AuthUserDto;
  tokens: AuthTokensDto;
}
