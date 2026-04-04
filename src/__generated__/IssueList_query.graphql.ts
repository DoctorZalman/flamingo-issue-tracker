/**
 * @generated SignedSource<<1b83a7e272b702443e947b91ed2b406f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueList_query$data = {
  readonly issuesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly nodeId: string;
        readonly " $fragmentSpreads": FragmentRefs<"IssueListItem_issue" | "StatusSelector_issue">;
      };
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
  } | null | undefined;
  readonly " $fragmentType": "IssueList_query";
};
export type IssueList_query$key = {
  readonly " $data"?: IssueList_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueList_query">;
};

import IssueListPaginationQuery_graphql from './IssueListPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "issuesCollection"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "filter"
    },
    {
      "defaultValue": 3,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": IssueListPaginationQuery_graphql
    }
  },
  "name": "IssueList_query",
  "selections": [
    {
      "alias": "issuesCollection",
      "args": [
        {
          "kind": "Variable",
          "name": "filter",
          "variableName": "filter"
        },
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": [
            {
              "created_at": "DescNullsLast"
            }
          ]
        }
      ],
      "concreteType": "issuesConnection",
      "kind": "LinkedField",
      "name": "__IssueList_query_issuesCollection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "issuesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "issues",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "nodeId",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "IssueListItem_issue"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "StatusSelector_issue"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
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
};
})();

(node as any).hash = "2a493e3da6cb8e5e179a2c74f165aa4c";

export default node;
