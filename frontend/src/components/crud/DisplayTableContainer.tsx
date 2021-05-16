/* eslint  react/jsx-props-no-spreading: 0 */ // --> OFF
import React, { useState } from "react";
import BTable from "react-bootstrap/Table";
import { useTable } from "react-table";
import { gql, useQuery } from "@apollo/client";

import { EntityResponse } from "../../APIClients/EntityAPIClient";

type EntityData = Omit<EntityResponse, "boolField"> & { boolField: string };

const convert = (entityReponse: EntityResponse) => {
  return {
    id: entityReponse.id,
    stringField: entityReponse.stringField,
    intField: entityReponse.intField,
    stringArrayField: entityReponse.stringArrayField,
    enumField: entityReponse.enumField,
    boolField: entityReponse.boolField.toString(),
  };
};

const DisplayTable = (props: any) => {
  const { data } = props;
  const columns = React.useMemo(
    () => [
      {
        Header: "id",

        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "stringField",

        accessor: "stringField", // accessor is the "key" in the data
      },

      {
        Header: "integerField",

        accessor: "intField",
      },
      {
        Header: "stringArrayField",

        accessor: "stringArrayField",
      },
      {
        Header: "enumField",

        accessor: "enumField",
      },
      {
        Header: "boolField",

        accessor: "boolField",
      },
    ],

    [],
  );

  const {
    getTableProps,

    headerGroups,

    rows,

    prepareRow,
  } = useTable({ columns, data });

  return (
    <BTable
      striped
      bordered
      hover
      size="sm"
      {...getTableProps()}
      style={{ marginTop: "20px" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </BTable>
  );
};

const ENTITIES = gql`
  query DisplayTableContainer_Entities {
    entities {
      id
      stringField
      intField
      enumField
      stringArrayField
      boolField
    }
  }
`;

const DisplayTableContainer = () => {
  const [entities, setEntities] = useState<EntityData[] | null>(null);

  useQuery(ENTITIES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setEntities(data.entities.map((d: EntityResponse) => convert(d)));
    },
  });

  return entities && <DisplayTable data={entities} />;
};

export default DisplayTableContainer;
