import EntityService from "../../services/implementations/entityService";
import { EntityRequestDTO } from "../../services/interfaces/IEntityService";

const entityService = new EntityService();

const entityResolvers = {
  Query: {
    entity: async (_req: any, { id }: { id: string }) => {
      return entityService.getEntity(id);
    },
    entities: async () => {
      return entityService.getEntities();
    },
  },
  Mutation: {
    createEntity: async (
      _req: any,
      { entity }: { entity: EntityRequestDTO },
    ) => {
      return entityService.createEntity({
        productName: entity.productName,
        price: entity.price,
        amountInStock: entity.amountInStock,
        productDescription: entity.productDescription,
      });
    },
    updateEntity: async (
      _req: any,
      { id, entity }: { id: string; entity: EntityRequestDTO },
    ) => {
      return entityService.updateEntity(id, {
        productName: entity.productName,
        price: entity.price,
        amountInStock: entity.amountInStock,
        productDescription: entity.productDescription,
      });
    },
    deleteEntity: async (_req: any, { id }: { id: string }) => {
      return entityService.deleteEntity(id);
    },
  },
};

export default entityResolvers;
