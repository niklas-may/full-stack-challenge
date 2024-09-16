export interface AuthUser {
  user: User;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  accountId: string;
}
