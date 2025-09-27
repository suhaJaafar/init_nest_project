import { PaginationQueryDto } from '@app/dto/pagination-query.dto';
import {
  Brackets,
  FindOptionsSelect,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

interface Options<T extends ObjectLiteral> {
  /** Repository of the entity */
  repo: Repository<T>;
  /** Fields to select */
  select?: FindOptionsSelect<T>;
  /** Pagination query parameters */
  params: PaginationQueryDto;
  /** Fields to search */
  queryFields: Array<keyof T>;
  /** Filters to apply */
  filters?: Partial<Record<keyof T, any>>;
  /** Custom database query to apply */
  customQuery?: (query: SelectQueryBuilder<T>) => void;
  /** Include soft-deleted entities */
  withDeleted?: boolean;
}

// FIXME: The function is producing conflicting relations when the relation is mentioned more than once. (i.e. user.image, shop.image)
export function getPaginationResult<T extends ObjectLiteral = any>({
  repo,
  select,
  params,
  queryFields,
  filters,
  customQuery,
  withDeleted,
}: Options<T>): Promise<[T[], number]> {
  const query = repo.createQueryBuilder('query');
  if (!query.expressionMap.mainAlias) throw new InternalServerErrorException();

  if (select) {
    findAndLoadRelations(query, select);
    const ref: { list: string[] } = { list: [] };
    injectSelectionIntoList(query, select, ref);
    query.select(ref.list);
  }

  if (params.query && queryFields.length) {
    query.andWhere(
      new Brackets((qb) => {
        queryFields.forEach((field) => {
          qb.orWhere(
            `(SELECT CAST(query.${String(field)} as VarChar)) ILIKE :keywords`,
            {
              keywords: `%${params.query}%`,
            },
          );
        });
      }),
    );
  }

  if (filters) {
    for (const filter in filters) {
      if (filters[filter] !== undefined) {
        let operator = '=';
        if (Array.isArray(filters[filter])) {
          operator = '@>';
        }
        query.andWhere(`${query.alias}.${filter} ${operator} :${filter}`, {
          [filter]: filters[filter],
        });
      }
    }
  }

  if (customQuery) {
    customQuery(query);
  }

  query.skip(params.offset ?? 0);
  query.take(params.limit ?? 10);

  if (params.orderBy && params.order) {
    if (params.orderBy === 'popularity') {
      query.orderBy(`${query.alias}.viewCount`, params.order);
    } else {
      query.orderBy(`${query.alias}.${params.orderBy}`, params.order);
    }
  }

  if (withDeleted) {
    query.withDeleted();
  }

  return query.getManyAndCount();
}

/** Recursively find and load relations */
function findAndLoadRelations<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  select: FindOptionsSelect<T>,
  prefix: string = query.alias,
) {
  Object.keys(select).forEach((field) => {
    if (typeof select[field] !== 'boolean') {
      const relation = String(field);
      query.leftJoinAndSelect(`${prefix}.${relation}`, relation);
      findAndLoadRelations(query, select[field] as any, relation);
    }
  });
}

/** Recursively inject selection into list */
function injectSelectionIntoList<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  select: FindOptionsSelect<T>,
  ref: { list: string[] },
  prefix: string = query.alias,
) {
  Object.keys(select).forEach((field) => {
    if (typeof select[field] === 'boolean') {
      ref.list.push(`${prefix}.${field}`);
    } else {
      const relation = String(field);
      injectSelectionIntoList(query, select[field] as any, ref, relation);
    }
  });
}
