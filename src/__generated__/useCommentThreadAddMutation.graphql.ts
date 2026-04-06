/**
 * @generated SignedSource<<fdfb7a32c6f55b488f3fa154cbd3df3a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCommentThreadAddMutation$variables = {
  authorId: string;
  body: string;
  issueId: string;
};
export type useCommentThreadAddMutation$data = {
  readonly insertIntocommentsCollection: {
    readonly records: ReadonlyArray<{
      readonly nodeId: string;
      readonly " $fragmentSpreads": FragmentRefs<"CommentItem_comment">;
    }>;
  } | null | undefined;
};
export type useCommentThreadAddMutation = {
  response: useCommentThreadAddMutation$data;
  variables: useCommentThreadAddMutation$variables;
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
    "name": "useCommentThreadAddMutation",
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
    "name": "useCommentThreadAddMutation",
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
    "cacheID": "a5bd36678fff17105b8e4d97fa963d4d",
    "id": null,
    "metadata": {},
    "name": "useCommentThreadAddMutation",
    "operationKind": "mutation",
    "text": "mutation useCommentThreadAddMutation(\n  $issueId: UUID!\n  $body: String!\n  $authorId: UUID!\n) {\n  insertIntocommentsCollection(objects: [{issue_id: $issueId, body: $body, author_id: $authorId}]) {\n    records {\n      nodeId\n      ...CommentItem_comment\n    }\n  }\n}\n\nfragment CommentItem_comment on comments {\n  nodeId\n  body\n  created_at\n  users {\n    name\n    avatar_url\n    nodeId\n  }\n}\n"
  }
};
})();

(node as any).hash = "d05c73cbbaaec9a755b04cc4e75e0722";

export default node;
