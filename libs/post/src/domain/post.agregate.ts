import { IPost } from './post.interface';
import { AggregateRoot } from '@nestjs/cqrs';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export class PostAgregate extends AggregateRoot implements IPost {
  id: string = randomStringGenerator();
  title: string;
  message: string;
  authorId: string;
  published = false;
  createdAt = new Date().toISOString();
  updatedAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAgregate();
    Object.assign(_post, post);

    return _post;
  }
}
