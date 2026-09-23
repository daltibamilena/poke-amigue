export type AuthPayload = {
  sub: number;
  username: string;
};

export type RegisterUserResponse = {
  id: number;
  username: string;
  createdAt: Date;
};

export type LoginUserResponse = {
  accessToken: string;
  user: {
    id: number;
    username: string;
  };
};
