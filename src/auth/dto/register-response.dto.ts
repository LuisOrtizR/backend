export class RegisterResponseDto {
  message: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    roles: string[];
  };
}
