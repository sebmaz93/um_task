import { UserRepository } from "./user.repository.js";

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async getUsers(limit: number, offset: number) {
    return await this.userRepo.getAll(limit, offset);
  }
}
