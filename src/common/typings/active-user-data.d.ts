declare interface ActiveUserData {
  sub: string;
  roles: Array<import('@app/enums').UserRole>;
  email?: string;
  // role: UserRole;
}
