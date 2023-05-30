import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostAgregate } from '@lib/post/domain';
import { PostRepository } from '@lib/post/providers';
import { Logger } from '@nestjs/common';
import { GetPostsQuery } from './get-posts.query';

@QueryHandler(GetPostsQuery)
export class GetPostQueryHandler
  implements IQueryHandler<GetPostsQuery, [[PostAgregate], number]>
{
  private readonly logger = new Logger(GetPostQueryHandler.name);

  constructor(private readonly postRepository: PostRepository) {}

  async execute({
    pagination,
  }: GetPostsQuery): Promise<[[PostAgregate], number]> {
    const [data, count] = await this.postRepository
      .findAll(pagination)
      .catch((err) => {
        this.logger.error(err);
        return [[], 0];
      });

    return [data, count] as [[PostAgregate], number];
  }
}
