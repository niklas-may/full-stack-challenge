export interface AuthUser {
  user: User;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  accountId: string;
  account: Account;
}

export interface Account {
  id: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
