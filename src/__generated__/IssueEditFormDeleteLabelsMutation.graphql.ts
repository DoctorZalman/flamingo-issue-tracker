/**
 * @generated SignedSource<<6633e082d8c4a82a67b9129ac29a8d2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueEditFormDeleteLabelsMutation$variables = {
  issueId: string;
};
export type IssueEditFormDeleteLabelsMutation$data = {
  readonly deleteFromissue_labelsCollection: {
    readonly records: ReadonlyArray<{
      readonly issue_id: string;
      readonly label_id: string;
    }>;
  };
};
export type IssueEditFormDeleteLabelsMutation = {
  response: IssueEditFormDeleteLabelsMutation$data;
  variables: IssueEditFormDeleteLabelsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "issueId"
  }
],
v1 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "eq",
            "variableName": "issueId"
          }
        ],
        "kind": "ObjectValue",
        "name": "issue_id"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "issue_id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label_id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueEditFormDeleteLabelsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "issue_labelsDeleteResponse",
        "kind": "LinkedField",
        "name": "deleteFromissue_labelsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "issue_labels",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueEditFormDeleteLabelsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "issue_labelsDeleteResponse",
        "kind": "LinkedField",
        "name": "deleteFromissue_labelsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "issue_labels",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nodeId",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "98b2e6e4909d4190ce27004e5d4dca07",
    "id": null,
    "metadata": {},
    "name": "IssueEditFormDeleteLabelsMutation",
    "operationKind": "mutation",
    "text": "mutation IssueEditFormDeleteLabelsMutation(\n  $issueId: UUID!\n) {\n  deleteFromissue_labelsCollection(filter: {issue_id: {eq: $issueId}}) {\n    records {\n      issue_id\n      label_id\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "90b7e25c023743b8a15f98c3fc872e85";

export default node;
