import React, { useState } from "react";
import { JSONSchema7 } from "json-schema";
import { Form } from "@rjsf/bootstrap-4";
import { gql, useMutation } from "@apollo/client";

import { EntityResponse } from "../../APIClients/EntityAPIClient";

const schema: JSONSchema7 = {
  title: "Update Entity",
  description: "A simple form to test updating an entity",
  type: "object",
  required: [
    "id",
    "stringField",
    "intField",
    "stringArrayField",
    "enumField",
    "boolField",
  ],
  properties: {
    id: {
      type: "string",
      title: "entity id",
      default: "123abc456def7890ghij1234",
    },
    stringField: {
      type: "string",
      title: "String Field",
      default: "UW Blueprint",
    },
    intField: {
      type: "integer",
      title: "Integer Field",
      default: 2017,
    },
    stringArrayField: {
      type: "array",
      items: {
        type: "string",
      },
      title: "String Array Field",
      default: [],
    },
    enumField: {
      type: "string",
      enum: ["A", "B", "C", "D"],
      title: "Enum Field",
      default: "A",
    },
    boolField: {
      type: "boolean",
      title: "Boolean Field",
      default: true,
    },
  },
};

const uiSchema = {
  boolField: {
    "ui:widget": "select",
  },
};

const UPDATE_ENTITY = gql`
  mutation UpdateForm_UpdateEntity($id: ID!, $entity: EntityRequestDTO!) {
    updateEntity(id: $id, entity: $entity) {
      id
      stringField
      intField
      enumField
      stringArrayField
      boolField
    }
  }
`;

const UpdateForm = () => {
  const [data, setData] = useState<EntityResponse | null>(null);

  const [updateEntity] = useMutation<{ updateEntity: EntityResponse }>(
    UPDATE_ENTITY,
  );

  if (data) {
    return <p>Updated! ✔️</p>;
  }

  const onSubmit = async ({ formData }: { formData: any }) => {
    const entityData: any = JSON.parse(JSON.stringify(formData));
    delete entityData.id;

    const graphQLResult = await updateEntity({
      variables: { id: formData.id, entity: entityData },
    });
    const result: EntityResponse | null =
      graphQLResult.data?.updateEntity ?? null;
    setData(result);
  };
  return <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit} />;
};

export default UpdateForm;
