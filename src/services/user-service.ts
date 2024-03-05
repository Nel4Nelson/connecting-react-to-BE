import create from "./https-services";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserService = () => create('/users')

export default UserService();
