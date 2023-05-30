import { PaginationDto } from '@lib/shared/dto';
import { IPost, PostAgregate } from '../domain';

export abstract class PostRepository {
  abstract save(post: IPost): Promise<PostAgregate>;
  abstract findOne(id: string): Promise<PostAgregate | null>;
  abstract findAll(
    pagination: PaginationDto,
  ): Promise<[[PostAgregate], number]>;
  abstract delete(id: string): Promise<boolean>;
}
