export class Login {
  constructor(
    username = '',
    password = '') {
      this.username = username;
      this.password = password;
    }

  username: string;
  password: string;
}
