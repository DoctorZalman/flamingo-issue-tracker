/**
 * @generated SignedSource<<a73ea586fcb69970d867f3775676f83b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueEditFormMutation$variables = {
  description?: string | null | undefined;
  nodeId: string;
  priority: string;
  status: string;
  title: string;
};
export type IssueEditFormMutation$data = {
  readonly updateissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly description: string | null | undefined;
      readonly nodeId: string;
      readonly priority: string;
      readonly status: string;
      readonly title: string;
    }>;
  };
};
export type IssueEditFormMutation = {
  response: IssueEditFormMutation$data;
  variables: IssueEditFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "nodeId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "priority"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "status"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v5 = [
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
            "name": "description",
            "variableName": "description"
          },
          {
            "kind": "Variable",
            "name": "priority",
            "variableName": "priority"
          },
          {
            "kind": "Variable",
            "name": "status",
            "variableName": "status"
          },
          {
            "kind": "Variable",
            "name": "title",
            "variableName": "title"
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priority",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueEditFormMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "IssueEditFormMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "8e7cfc4cc947cfd66488ed45b8f48615",
    "id": null,
    "metadata": {},
    "name": "IssueEditFormMutation",
    "operationKind": "mutation",
    "text": "mutation IssueEditFormMutation(\n  $nodeId: ID!\n  $title: String!\n  $description: String\n  $status: String!\n  $priority: String!\n) {\n  updateissuesCollection(filter: {nodeId: {eq: $nodeId}}, set: {title: $title, description: $description, status: $status, priority: $priority}) {\n    records {\n      nodeId\n      title\n      description\n      status\n      priority\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "afd26677858901433b58c13f0ddcf9b5";

export default node;
