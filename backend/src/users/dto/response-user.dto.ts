// class ITask {
//   id: number;
//   name: string;
//   createdAt?: Date;
//   description: string;
//   completed: boolean;
//   userId: number;
// }
export class ResponseFindOneUserDto {
  id: string;
  name: string;
  email: string;
}

export class ResponseCreateUserDto {
  id: string;
  name: string;
  email: string;
}
