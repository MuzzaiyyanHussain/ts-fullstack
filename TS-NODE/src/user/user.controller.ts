import { injectable } from "inversify";

@injectable()
export class UserController {
  constructor() {}

  public getUser() {
    return {
      firstName: "john",
      lastName: "doe",
      email: "john@doe.com",
    };
  }
}
