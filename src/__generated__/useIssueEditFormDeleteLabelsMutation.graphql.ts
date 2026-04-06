/**
 * @generated SignedSource<<9ba73c610b4c946c1ecba214c42866a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useIssueEditFormDeleteLabelsMutation$variables = {
  issueId: string;
};
export type useIssueEditFormDeleteLabelsMutation$data = {
  readonly deleteFromissue_labelsCollection: {
    readonly records: ReadonlyArray<{
      readonly issue_id: string;
      readonly label_id: string;
    }>;
  };
};
export type useIssueEditFormDeleteLabelsMutation = {
  response: useIssueEditFormDeleteLabelsMutation$data;
  variables: useIssueEditFormDeleteLabelsMutation$variables;
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
    "kind": "Literal",
    "name": "atMost",
    "value": 10
  },
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
    "name": "useIssueEditFormDeleteLabelsMutation",
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
    "name": "useIssueEditFormDeleteLabelsMutation",
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
    "cacheID": "8c40d94f2122a64eeaf131b724b51ef7",
    "id": null,
    "metadata": {},
    "name": "useIssueEditFormDeleteLabelsMutation",
    "operationKind": "mutation",
    "text": "mutation useIssueEditFormDeleteLabelsMutation(\n  $issueId: UUID!\n) {\n  deleteFromissue_labelsCollection(filter: {issue_id: {eq: $issueId}}, atMost: 10) {\n    records {\n      issue_id\n      label_id\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "641985c63be2c90b10bec5b888d45892";

export default node;
