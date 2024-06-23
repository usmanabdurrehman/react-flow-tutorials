export const schema = `
model Post{
  id: number;
  title: string;
  author: User;
  comments: Comment[];
  createdAt: Date
}

model Comment{
  id: number;
  text: string;
}

model User{
  id: number;
  name: string;
  email: string;
}

`;
