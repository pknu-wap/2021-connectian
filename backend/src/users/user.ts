export class User {
  constructor(
    displayName: string,
    email: string,
    googleId: string,
    photo: string,
    roles: string,
  ) {
    this.displayName = displayName;
    this.email = email;
    this.googleId = googleId;
    this.photo = photo;
    this.roles = roles;
  }

  displayName: string;
  email: string;
  googleId: string;
  photo: string;
  roles: string;
}
