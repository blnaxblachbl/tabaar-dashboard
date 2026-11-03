import type { CodegenConfig } from "@graphql-codegen/cli";

const DEFAULT_CONFIG = {
  plugins: [
    {
      add: {
        content: "/* eslint-disable */\n// @ts-nocheck",
      },
    },
    "typescript-operations",
    "typescript-react-apollo",
  ],
  config: {
    skipTypename: false,
    withHooks: true,
    withHOC: false,
    withComponent: false,
    apolloReactHooksImportFrom: "@apollo/client/react",
    apolloReactCommonImportFrom: "@apollo/client/react",
    namingConvention: {
      enumValues: "keep",
      transformUnderscore: true,
    },
    enumType: "native",
    scalars: {
      DateTime: {
        input: "Date",
        output: "Date",
      },
      Json: {
        input: "Record<string, any>",
        output: "Record<string, any>",
      },
      Characterstic: {
        input: "Record<string, string | number | boolean>",
        output: "Record<string, string | number | boolean>",
      },
    },
  },
};

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "src/graphql/generated.ts": {
      schema: [
        {
          "http://localhost:4000/graphql": {
            headers: {
              "x-api-key": "osWK9Y6462T4mJ8A",
            },
          },
        },
        "./src/graphql/client-schema.graphql",
      ],
      documents: "./src/graphql/documents/*.graphql",
      ...DEFAULT_CONFIG,
    },
  },
};

export default config;
