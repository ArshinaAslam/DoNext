import { SignupDto, LoginDto, AuthResultDto } from "../../dto/auth.dto";

export interface IAuthService {
  signup(dto: SignupDto): Promise<AuthResultDto>;
  login(dto: LoginDto): Promise<AuthResultDto>;
  refreshToken(token: string): { accessToken: string };
  getCurrentUser(userId: string): Promise<{ _id: string; name: string; email: string }>;
}
