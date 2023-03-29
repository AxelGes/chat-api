import { BadGatewayException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityBase } from '../../common/models/entity.model';

export abstract class BaseService<T extends EntityBase> {
  constructor(private readonly genericRepository: Repository<T>) {}

  create(createInput: any): Promise<T> {
    try {
      return this.genericRepository.save(createInput);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  getAll(options: FindManyOptions<T>): Promise<T[]> {
    try {
      return this.genericRepository.find(options);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  get(options: FindOneOptions<T>): Promise<T> {
    try {
      return this.genericRepository.findOne(options);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async delete(options: FindOneOptions<T>): Promise<T> {
    try {
      const retrievedEntity: T = await this.genericRepository.findOne(options);

      if (retrievedEntity == null) throw new Error('Not existing');

      return this.genericRepository.remove(retrievedEntity);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async update(options: FindOneOptions<T>, updateInput: QueryDeepPartialEntity<T>): Promise<T> {
    try {
      const retrievedEntity: T = await this.genericRepository.findOne(options);

      if (retrievedEntity == null) throw new Error('Not existing');

      return this.genericRepository.save({ ...retrievedEntity, ...updateInput });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
