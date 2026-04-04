/**
 * @generated SignedSource<<e0c77faf0e0e6ea190a63eae4734b3a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentThreadAddMutation$variables = {
  authorId: string;
  body: string;
  issueId: string;
};
export type CommentThreadAddMutation$data = {
  readonly insertIntocommentsCollection: {
    readonly records: ReadonlyArray<{
      readonly nodeId: string;
      readonly " $fragmentSpreads": FragmentRefs<"CommentItem_comment">;
    }>;
  } | null | undefined;
};
export type CommentThreadAddMutation = {
  response: CommentThreadAddMutation$data;
  variables: CommentThreadAddMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "authorId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "body"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "issueId"
},
v3 = [
  {
    "items": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "author_id",
            "variableName": "authorId"
          },
          {
            "kind": "Variable",
            "name": "body",
            "variableName": "body"
          },
          {
            "kind": "Variable",
            "name": "issue_id",
            "variableName": "issueId"
          }
        ],
        "kind": "ObjectValue",
        "name": "objects.0"
      }
    ],
    "kind": "ListValue",
    "name": "objects"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommentThreadAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "commentsInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntocommentsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "comments",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CommentItem_comment"
              }
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CommentThreadAddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "commentsInsertResponse",
        "kind": "LinkedField",
        "name": "insertIntocommentsCollection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "comments",
            "kind": "LinkedField",
            "name": "records",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "body",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "created_at",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "users",
                "kind": "LinkedField",
                "name": "users",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "avatar_url",
                    "storageKey": null
                  },
                  (v4/*: any*/)
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
    "cacheID": "5d41492b6bcdb5ac4551af6a70570bc0",
    "id": null,
    "metadata": {},
    "name": "CommentThreadAddMutation",
    "operationKind": "mutation",
    "text": "mutation CommentThreadAddMutation(\n  $issueId: UUID!\n  $body: String!\n  $authorId: UUID!\n) {\n  insertIntocommentsCollection(objects: [{issue_id: $issueId, body: $body, author_id: $authorId}]) {\n    records {\n      nodeId\n      ...CommentItem_comment\n    }\n  }\n}\n\nfragment CommentItem_comment on comments {\n  nodeId\n  body\n  created_at\n  users {\n    name\n    avatar_url\n    nodeId\n  }\n}\n"
  }
};
})();

(node as any).hash = "1b5cfade99258fb38851fd557cc1f625";

export default node;
