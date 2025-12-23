import { UserRepository } from "./user.repository.js";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository = new UserRepository(),
  ) {}

  async getUsers(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { data, total } = await this.userRepo.getAll(limit, offset);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
