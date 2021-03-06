import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { EditUserInput } from './dto/edit-user.input';
import { CanPass } from 'src/utils/canpass.decorator';
import { Roles } from 'src/types/enums/user-roles.enum';
import { SearchUserInput } from './dto/search-user.input';
import { SearchUserFilter } from './dto/search-user.filter';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  @CanPass(Roles.ADMIN)
  create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Mutation('editUser')
  @CanPass(Roles.ADMIN)
  edit(
    @Args('id') userId: string,
    @Args('editUserInput') editUserInput: EditUserInput,
  ): Promise<User> {
    return this.usersService.edit(userId, editUserInput);
  }

  @Mutation('deleteUser')
  @CanPass(Roles.ADMIN)
  delete(@Args('id') userId: string): Promise<boolean> {
    return this.usersService.delete(userId);
  }

  @Query('getMe')
  @CanPass(...Object.values(Roles))
  me(@Context('user') user: User): User {
    return user;
  }

  @Query('users')
  @CanPass(Roles.ADMIN, Roles.DOCTOR)
  findAll(
    @Args('input') input: SearchUserInput,
    @Args('filter') filter: SearchUserFilter,
  ): Promise<User[]> {
    return this.usersService.findAll(input, filter);
  }
}
