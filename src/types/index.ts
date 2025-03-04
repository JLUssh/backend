type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

declare global {
  var user: User | null;
}

export = {
  global,
};
