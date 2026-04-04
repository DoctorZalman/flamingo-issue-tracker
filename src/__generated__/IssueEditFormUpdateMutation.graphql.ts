/**
 * @generated SignedSource<<38a86c3963fb8de6982b36ab8d04c1fb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueEditFormUpdateMutation$variables = {
  assigneeId?: string | null | undefined;
  description?: string | null | undefined;
  nodeId: string;
  priority: string;
  status: string;
  title: string;
};
export type IssueEditFormUpdateMutation$data = {
  readonly updateissuesCollection: {
    readonly records: ReadonlyArray<{
      readonly assignee_id: string | null | undefined;
      readonly description: string | null | undefined;
      readonly nodeId: string;
      readonly priority: string;
      readonly status: string;
      readonly title: string;
    }>;
  };
};
export type IssueEditFormUpdateMutation = {
  response: IssueEditFormUpdateMutation$data;
  variables: IssueEditFormUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "assigneeId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "nodeId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "priority"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "status"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v6 = [
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
            "name": "assignee_id",
            "variableName": "assigneeId"
          },
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "assignee_id",
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
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueEditFormUpdateMutation",
    "selections": (v6/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v5/*: any*/),
      (v1/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "IssueEditFormUpdateMutation",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "0c7dd74f6b4afb3ae88c52a61cb16b7f",
    "id": null,
    "metadata": {},
    "name": "IssueEditFormUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation IssueEditFormUpdateMutation(\n  $nodeId: ID!\n  $title: String!\n  $description: String\n  $status: String!\n  $priority: String!\n  $assigneeId: UUID\n) {\n  updateissuesCollection(filter: {nodeId: {eq: $nodeId}}, set: {title: $title, description: $description, status: $status, priority: $priority, assignee_id: $assigneeId}) {\n    records {\n      nodeId\n      title\n      description\n      status\n      priority\n      assignee_id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a20513c24bc836fe34741fee3be32555";

export default node;
