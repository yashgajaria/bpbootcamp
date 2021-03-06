import React, { useState } from "react";
import { JSONSchema7 } from "json-schema";
import { Form } from "@rjsf/bootstrap-4";
import { gql, useMutation } from "@apollo/client";

import { EntityResponse } from "../../APIClients/EntityAPIClient";

const schema: JSONSchema7 = {
  title: "Add freshly baked products",
  description: "Post Products Online from this form",
  type: "object",
  required: ["productName", "price", "amountInStock", "productDescription"],
  properties: {
    productName: {
      type: "string",
      title: "Product",
      default: "Bread",
    },
    price: {
      type: "integer",
      title: "Price",
      default: 5,
    },
    amountInStock: {
      type: "integer",
      title: "Amount",
      default: 100,
    },
    productDescription: {
      type: "string",
      title: "Product Description",
      default: "Let's get this bread",
    },
  },
};

const uiSchema = {
  boolField: {
    "ui:widget": "select",
  },
};

const CREATE_ENTITY = gql`
  mutation CreateForm_CreateEntity($entity: EntityRequestDTO!) {
    createEntity(entity: $entity) {
      id
      productName
      price
      amountInStock
      productDescription
    }
  }
`;

const CreateForm = () => {
  const [data, setData] = useState<EntityResponse | null>(null);

  const [createEntity] = useMutation<{ createEntity: EntityResponse }>(
    CREATE_ENTITY,
  );

  if (data) {
    return <p>Created! ✔️</p>;
  }

  const onSubmit = async ({ formData }: { formData: any }) => {
    console.log("submitting");
    const graphQLResult = await createEntity({
      variables: { entity: formData },
    });
    console.log(graphQLResult);
    const result: EntityResponse | null =
      graphQLResult.data?.createEntity ?? null;
    setData(result);
    console.log(result);
  };
  return <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit} />;
};

export default CreateForm;
