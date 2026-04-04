/**
 * @generated SignedSource<<83b9863ad6f3f330317264eb177edca0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type StatusSelectorMutation$variables = {
  nodeId: string;
  status: string;
};
export type StatusSelectorMutation$data = {
  readonly updateissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly nodeId: string;
      readonly status: string;
    }>;
  };
};
export type StatusSelectorMutation = {
  response: StatusSelectorMutation$data;
  variables: StatusSelectorMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "nodeId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "eq",
                "variableName": "nodeId"
              }
            ],
            "kind": "ObjectValue",
            "name": "nodeId"
          }
        ],
        "kind": "ObjectValue",
        "name": "filter"
      },
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "status",
            "variableName": "status"
          }
        ],
        "kind": "ObjectValue",
        "name": "set"
      }
    ],
    "concreteType": "issuesUpdateResponse",
    "kind": "LinkedField",
    "name": "updateissuesCollection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "issues",
        "kind": "LinkedField",
        "name": "records",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "nodeId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StatusSelectorMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StatusSelectorMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b10ba60000f8d6e256782f7ba195373e",
    "id": null,
    "metadata": {},
    "name": "StatusSelectorMutation",
    "operationKind": "mutation",
    "text": "mutation StatusSelectorMutation(\n  $nodeId: ID!\n  $status: String!\n) {\n  updateissuesCollection(filter: {nodeId: {eq: $nodeId}}, set: {status: $status}) {\n    records {\n      nodeId\n      status\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "73c91a0ae0616bb8dd933ceb9d5d4da3";

export default node;
