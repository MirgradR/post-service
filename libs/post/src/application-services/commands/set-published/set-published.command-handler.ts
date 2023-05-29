import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SetPublishedCommand } from './set-published.command';
import { BadRequestException, Logger } from '@nestjs/common';
import { PostRepository } from '@lib/post/providers';
import { PostAgregate } from '@lib/post/domain';

@CommandHandler(SetPublishedCommand)
export class SetPublishedCommandHandler
  implements ICommandHandler<SetPublishedCommand, PostAgregate>
{
  private readonly logger = new Logger(SetPublishedCommandHandler.name);
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ id }: SetPublishedCommand): Promise<PostAgregate> {
    const existPost = await this.postRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null;
    });

    if (!existPost) {
      throw new BadRequestException(`Post by id ${id} not found`);
    }

    const postAgregate = PostAgregate.create(existPost);

    postAgregate.setPublished();

    await this.postRepository.save(postAgregate);

    return postAgregate;
  }
}
