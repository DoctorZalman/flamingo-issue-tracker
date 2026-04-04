/**
 * @generated SignedSource<<6adbe286d869b2ee5bdb32e64a2d8b0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueFiltersQuery$variables = Record<PropertyKey, never>;
export type IssueFiltersQuery$data = {
  readonly labelsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly color: string;
        readonly id: string;
        readonly name: string;
      };
    }>;
  } | null | undefined;
};
export type IssueFiltersQuery = {
  response: IssueFiltersQuery$data;
  variables: IssueFiltersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "color",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueFiltersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "labelsConnection",
        "kind": "LinkedField",
        "name": "labelsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "labelsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "labels",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IssueFiltersQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "labelsConnection",
        "kind": "LinkedField",
        "name": "labelsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "labelsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "labels",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "82d1c295dd431b34a518c80f44869808",
    "id": null,
    "metadata": {},
    "name": "IssueFiltersQuery",
    "operationKind": "query",
    "text": "query IssueFiltersQuery {\n  labelsCollection {\n    edges {\n      node {\n        id\n        name\n        color\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1ad27d1cb57373aadc32a9434d4e50f8";

export default node;
