import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { PostAgregate } from '@lib/post/domain';
import { PostRepository } from '@lib/post/providers';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand, PostAgregate>
{
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ post }: CreatePostCommand): Promise<PostAgregate> {
    const postAgregate = PostAgregate.create(post);

    const createdPost = await this.postRepository
      .save(postAgregate)
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return createdPost;
  }
}
