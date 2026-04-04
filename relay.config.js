module.exports = {
  src: './src',
  schema: './schema.graphql',
  language: 'typescript',
  artifactDirectory: './src/__generated__',
  schemaConfig: {
    nodeInterfaceIdField: 'nodeId',
    nodeInterfaceIdVariableName: 'nodeId',
  },
  customScalarTypes: {
    UUID: 'string',
    Datetime: 'string',
    Cursor: 'string',
    JSON: 'unknown',
    BigInt: 'string',
    BigFloat: 'string',
    Opaque: 'unknown',
  },
}