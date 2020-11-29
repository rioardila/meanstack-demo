export class User {

  constructor(
    _id = '',
    firstName = '',
    lastName = '',
    email = '') {
      this._id = _id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    }

  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
