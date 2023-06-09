import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { PostAggregate } from '@lib/post/domain';
import { PostRepository } from '@lib/post/providers';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand, PostAggregate>
{
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ post }: CreatePostCommand): Promise<PostAggregate> {
    const postAgregate = PostAggregate.create(post);

    const createdPost = await this.postRepository
      .save(postAgregate)
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return createdPost;
  }
}
