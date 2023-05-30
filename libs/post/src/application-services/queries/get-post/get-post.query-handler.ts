import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostQuery } from './get-post.query';
import { PostAgregate } from '@lib/post/domain';
import { PostRepository } from '@lib/post/providers';
import { Logger } from '@nestjs/common';

@QueryHandler(GetPostQuery)
export class GetPostQueryHandler
  implements IQueryHandler<GetPostQuery, PostAgregate>
{
  private readonly logger = new Logger(GetPostQueryHandler.name);
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ id }: GetPostQuery): Promise<PostAgregate | null> {
    const existPost = await this.postRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as PostAgregate;
    });

    return existPost;
  }
}
