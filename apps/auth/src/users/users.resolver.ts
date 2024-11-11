import { UserDocument } from '@app/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Resolver(() => UserDocument)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserDocument)
  createUser(@Args('createUserInput') createUserInput: CreateUserDto) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserDocument], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }
}
