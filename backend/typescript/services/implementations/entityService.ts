import MgEntity, { Entity } from "../../models/entity.model";
import {
  IEntityService,
  EntityRequestDTO,
  EntityResponseDTO,
} from "../interfaces/IEntityService";
import Logger from "../../utilities/logger";

class EntityService implements IEntityService {
  /* eslint-disable class-methods-use-this */
  async getEntity(id: string): Promise<EntityResponseDTO> {
    let entity: Entity | null;
    try {
      entity = await MgEntity.findById(id);
      if (!entity) {
        throw new Error(`Entity id ${id} not found`);
      }
    } catch (error) {
      Logger.error(`Failed to get entity. Reason = ${error.message}`);
      throw error;
    }

    return {
      id: entity.id,
      productName: entity.productName,
      price: entity.price,
      amountInStock: entity.amountInStock,
      productDescription: entity.productDescription,
    };
  }

  async getEntities(): Promise<EntityResponseDTO[]> {
    try {
      const entities: Array<Entity> = await MgEntity.find();
      return entities.map((entity) => ({
        id: entity.id,
        productName: entity.productName,
        price: entity.price,
        amountInStock: entity.amountInStock,
        productDescription: entity.productDescription,
      }));
    } catch (error) {
      Logger.error(`Failed to get entities. Reason = ${error.message}`);
      throw error;
    }
  }

  async createEntity(entity: EntityRequestDTO): Promise<EntityResponseDTO> {
    let newEntity: Entity | null;
    try {
      newEntity = await MgEntity.create(entity);
    } catch (error) {
      Logger.error(`Failed to create entity. Reason = ${error.message}`);
      throw error;
    }
    return {
      id: newEntity.id,
      productName: newEntity.productName,
      price: newEntity.price,
      amountInStock: newEntity.amountInStock,
      productDescription: newEntity.productDescription,
    };
  }

  async updateEntity(
    id: string,
    entity: EntityRequestDTO,
  ): Promise<EntityResponseDTO | null> {
    let updatedEntity: Entity | null;
    try {
      updatedEntity = await MgEntity.findByIdAndUpdate(id, entity, {
        new: true,
        runValidators: true,
      });
      if (!updatedEntity) {
        throw new Error(`Entity id ${id} not found`);
      }
    } catch (error) {
      Logger.error(`Failed to update entity. Reason = ${error.message}`);
      throw error;
    }
    return {
      id: updatedEntity.id,
      productName: updatedEntity.productName,
      price: updatedEntity.price,
      amountInStock: updatedEntity.amountInStock,
      productDescription: updatedEntity.productDescription,
    };
  }

  async deleteEntity(id: string): Promise<void> {
    try {
      const deletedEntity: Entity | null = await MgEntity.findByIdAndDelete(id);
      if (!deletedEntity) {
        throw new Error(`Entity id ${id} not found`);
      }
    } catch (error) {
      Logger.error(`Failed to delete entity. Reason = ${error.message}`);
      throw error;
    }
  }
}

export default EntityService;
