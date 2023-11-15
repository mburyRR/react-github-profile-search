import { faker } from '@faker-js/faker';
import { User, UserRes } from '@store/types';
import { Factory } from 'rosie';

export const UserResFactory = new Factory<UserRes>()
  .attr('id', () => faker.number.int({ min: 100, max: 1000 }))
  .attr('login', () => faker.internet.userName())
  .attr('name', () => faker.person.fullName())
  .attr('html_url', () => faker.internet.url())
  .attr('bio', () => faker.person.bio())
  .attr('avatar_url', () => faker.internet.url())
  .attr('public_repos', () => faker.number.int(100))
  .attr('followers', () => faker.number.int(1000))
  .attr('following', () => faker.number.int(10));

export const UserFactory = new Factory<User>()
  .attr('id', () => faker.number.int({ min: 100, max: 1000 }))
  .attr('login', () => faker.internet.userName())
  .attr('name', () => faker.person.fullName())
  .attr('url', () => faker.internet.url())
  .attr('bio', () => faker.person.bio())
  .attr('avatarUrl', () => faker.internet.url())
  .attr('publicRepos', () => faker.number.int(100))
  .attr('followers', () => faker.number.int(1000))
  .attr('following', () => faker.number.int(10));

export const UserListResFactoryItem = new Factory()
  .attr('id', () => faker.number.int({ min: 100, max: 1000 }))
  .attr('login', () => faker.internet.userName())
  .attr('avatar_url', () => faker.internet.url());

export const UserListFactoryItem = new Factory()
  .attr('id', () => faker.number.int({ min: 100, max: 1000 }))
  .attr('login', () => faker.internet.userName())
  .attr('avatarUrl', () => faker.internet.url());

export const GithuStateFactory = new Factory().attr('userList', () =>
  UserListFactoryItem.buildList(1),
);
