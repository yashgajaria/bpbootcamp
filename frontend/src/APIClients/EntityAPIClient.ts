import baseAPIClient from "./BaseAPIClient";

enum EnumField {
  "A",
  "B",
  "C",
  "D",
}

type EntityRequest = {
  stringField: string;
  intField: number;
  stringArrayField: string[];
  enumField: EnumField;
  boolField: boolean;
};

export type EntityResponse = {
  id: string | number;
  stringField: string;
  intField: number;
  stringArrayField: string[];
  enumField: EnumField;
  boolField: boolean;
};

const create = async ({
  formData,
}: {
  formData: EntityRequest;
}): Promise<EntityResponse> => {
  try {
    const { data } = await baseAPIClient.post("/entities", formData);
    return data;
  } catch (error) {
    return error;
  }
};

const get = async (): Promise<EntityResponse[]> => {
  try {
    const { data } = await baseAPIClient.get("/entities");
    return data;
  } catch (error) {
    return error;
  }
};

const update = async (
  id: number | string,
  {
    entityData,
  }: {
    entityData: EntityRequest;
  },
): Promise<EntityResponse> => {
  try {
    const { data } = await baseAPIClient.put(`/entities/${id}`, entityData);
    return data;
  } catch (error) {
    return error;
  }
};

export default { create, get, update };
