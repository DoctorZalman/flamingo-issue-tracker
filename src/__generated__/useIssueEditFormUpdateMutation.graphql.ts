/**
 * @generated SignedSource<<98c904b7db1bc7e352319becb6f96362>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useIssueEditFormUpdateMutation$variables = {
  assigneeId?: string | null | undefined;
  description?: string | null | undefined;
  nodeId: string;
  priority: string;
  status: string;
  title: string;
};
export type useIssueEditFormUpdateMutation$data = {
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
export type useIssueEditFormUpdateMutation = {
  response: useIssueEditFormUpdateMutation$data;
  variables: useIssueEditFormUpdateMutation$variables;
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
    "name": "useIssueEditFormUpdateMutation",
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
    "name": "useIssueEditFormUpdateMutation",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "dedfba36e7b7d5b91faef03009ffd407",
    "id": null,
    "metadata": {},
    "name": "useIssueEditFormUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation useIssueEditFormUpdateMutation(\n  $nodeId: ID!\n  $title: String!\n  $description: String\n  $status: String!\n  $priority: String!\n  $assigneeId: UUID\n) {\n  updateissuesCollection(filter: {nodeId: {eq: $nodeId}}, set: {title: $title, description: $description, status: $status, priority: $priority, assignee_id: $assigneeId}) {\n    records {\n      nodeId\n      title\n      description\n      status\n      priority\n      assignee_id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d3d78377d7bdb3ee4b9cce6ff2a3121b";

export default node;
