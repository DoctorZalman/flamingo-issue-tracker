/**
 * @generated SignedSource<<a50687cd663a2220807cdc22196a032d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCommentThread_issue$data = {
  readonly commentsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly nodeId: string;
        readonly " $fragmentSpreads": FragmentRefs<"CommentItem_comment">;
      };
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
  } | null | undefined;
  readonly id: string;
  readonly nodeId: string;
  readonly " $fragmentType": "useCommentThread_issue";
};
export type useCommentThread_issue$key = {
  readonly " $data"?: useCommentThread_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCommentThread_issue">;
};

import useCommentThreadPaginationQuery_graphql from './useCommentThreadPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "commentsCollection"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 5,
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
      "fragmentPathInResult": [
        "node"
      ],
      "operation": useCommentThreadPaginationQuery_graphql,
      "identifierInfo": {
        "identifierField": "nodeId",
        "identifierQueryVariableName": "nodeId"
      }
    }
  },
  "name": "useCommentThread_issue",
  "selections": [
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": "commentsCollection",
      "args": [
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": [
            {
              "created_at": "AscNullsLast"
            }
          ]
        }
      ],
      "concreteType": "commentsConnection",
      "kind": "LinkedField",
      "name": "__useCommentThread_issue_commentsCollection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "commentsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "comments",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CommentItem_comment"
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
      "storageKey": "__useCommentThread_issue_commentsCollection_connection(orderBy:[{\"created_at\":\"AscNullsLast\"}])"
    }
  ],
  "type": "issues",
  "abstractKey": null
};
})();

(node as any).hash = "72bacef6e56fb1ab2fa2ca7eb43851e6";

export default node;
