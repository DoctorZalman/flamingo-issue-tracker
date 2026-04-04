/**
 * @generated SignedSource<<698ecd512dfaee62a22129011081eb05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type issue_labelsInsertInput = {
  issue_id?: string | null | undefined;
  label_id?: string | null | undefined;
};
export type IssueEditFormInsertLabelsMutation$variables = {
  objects: ReadonlyArray<issue_labelsInsertInput>;
};
export type IssueEditFormInsertLabelsMutation$data = {
  readonly insertIntoissue_labelsCollection: {
    readonly records: ReadonlyArray<{
      readonly issue_id: string;
      readonly label_id: string;
    }>;
  } | null | undefined;
};
export type IssueEditFormInsertLabelsMutation = {
  response: IssueEditFormInsertLabelsMutation$data;
  variables: IssueEditFormInsertLabelsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "objects"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "objects",
    "variableName": "objects"
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
    "name": "IssueEditFormInsertLabelsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "issue_labelsInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoissue_labelsCollection",
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
    "name": "IssueEditFormInsertLabelsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "issue_labelsInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntoissue_labelsCollection",
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
    "cacheID": "cf5faaf4919ea4acb7f47265f67142ac",
    "id": null,
    "metadata": {},
    "name": "IssueEditFormInsertLabelsMutation",
    "operationKind": "mutation",
    "text": "mutation IssueEditFormInsertLabelsMutation(\n  $objects: [issue_labelsInsertInput!]!\n) {\n  insertIntoissue_labelsCollection(objects: $objects) {\n    records {\n      issue_id\n      label_id\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "73d83fd06d9fcce75ffeab5129df16c0";

export default node;
