/**
 * @generated SignedSource<<e640e93960ec7276fb17ea897bc89aae>>
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
export type useIssueEditFormInsertLabelsMutation$variables = {
  objects: ReadonlyArray<issue_labelsInsertInput>;
};
export type useIssueEditFormInsertLabelsMutation$data = {
  readonly insertIntoissue_labelsCollection: {
    readonly records: ReadonlyArray<{
      readonly issue_id: string;
      readonly label_id: string;
    }>;
  } | null | undefined;
};
export type useIssueEditFormInsertLabelsMutation = {
  response: useIssueEditFormInsertLabelsMutation$data;
  variables: useIssueEditFormInsertLabelsMutation$variables;
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
    "name": "useIssueEditFormInsertLabelsMutation",
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
    "name": "useIssueEditFormInsertLabelsMutation",
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
    "cacheID": "0db07f7fd93d20370d7e5fc715eaabd0",
    "id": null,
    "metadata": {},
    "name": "useIssueEditFormInsertLabelsMutation",
    "operationKind": "mutation",
    "text": "mutation useIssueEditFormInsertLabelsMutation(\n  $objects: [issue_labelsInsertInput!]!\n) {\n  insertIntoissue_labelsCollection(objects: $objects) {\n    records {\n      issue_id\n      label_id\n      nodeId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e36fff0fbf310de37a0ad88e596717cd";

export default node;
