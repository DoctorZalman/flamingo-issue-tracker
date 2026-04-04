/**
 * @generated SignedSource<<2fd340f519a9ef04387ccdca105f6103>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageIssueDetailQuery$variables = {
  id: string;
};
export type pageIssueDetailQuery$data = {
  readonly issuesCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly nodeId: string;
        readonly " $fragmentSpreads": FragmentRefs<"IssueDetail_issue">;
      };
    }>;
  } | null | undefined;
};
export type pageIssueDetailQuery = {
  response: pageIssueDetailQuery$data;
  variables: pageIssueDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "id"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created_at",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "users",
  "kind": "LinkedField",
  "name": "users",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar_url",
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      {
        "created_at": "AscNullsLast"
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "pageIssueDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "issuesConnection",
        "kind": "LinkedField",
        "name": "issuesCollection",
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
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "IssueDetail_issue"
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pageIssueDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "issuesConnection",
        "kind": "LinkedField",
        "name": "issuesCollection",
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "issue_labelsConnection",
                    "kind": "LinkedField",
                    "name": "issue_labelsCollection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "issue_labelsEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "issue_labels",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "labels",
                                "kind": "LinkedField",
                                "name": "labels",
                                "plural": false,
                                "selections": [
                                  (v6/*: any*/),
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "color",
                                    "storageKey": null
                                  },
                                  (v2/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "label_id",
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
                  },
                  (v6/*: any*/),
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
                  },
                  {
                    "alias": null,
                    "args": (v7/*: any*/),
                    "concreteType": "commentsConnection",
                    "kind": "LinkedField",
                    "name": "commentsCollection",
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
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "body",
                                "storageKey": null
                              },
                              (v3/*: any*/),
                              (v5/*: any*/),
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
                    "storageKey": "commentsCollection(first:5,orderBy:[{\"created_at\":\"AscNullsLast\"}])"
                  },
                  {
                    "alias": null,
                    "args": (v7/*: any*/),
                    "filters": [
                      "orderBy"
                    ],
                    "handle": "connection",
                    "key": "CommentThread_issue_commentsCollection",
                    "kind": "LinkedHandle",
                    "name": "commentsCollection"
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
    "cacheID": "b1985fbe744710da11395e007122a83d",
    "id": null,
    "metadata": {},
    "name": "pageIssueDetailQuery",
    "operationKind": "query",
    "text": "query pageIssueDetailQuery(\n  $id: UUID!\n) {\n  issuesCollection(filter: {id: {eq: $id}}, first: 1) {\n    edges {\n      node {\n        nodeId\n        ...IssueDetail_issue\n      }\n    }\n  }\n}\n\nfragment CommentItem_comment on comments {\n  nodeId\n  body\n  created_at\n  users {\n    name\n    avatar_url\n    nodeId\n  }\n}\n\nfragment CommentThread_issue on issues {\n  nodeId\n  commentsCollection(first: 5, orderBy: [{created_at: AscNullsLast}]) {\n    edges {\n      node {\n        nodeId\n        ...CommentItem_comment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment IssueDetail_issue on issues {\n  nodeId\n  title\n  created_at\n  users {\n    name\n    avatar_url\n    nodeId\n  }\n  issue_labelsCollection {\n    edges {\n      node {\n        labels {\n          id\n          name\n          color\n          nodeId\n        }\n        nodeId\n      }\n    }\n  }\n  ...IssueEditForm_issue\n  ...CommentThread_issue\n}\n\nfragment IssueEditForm_issue on issues {\n  nodeId\n  id\n  title\n  description\n  status\n  priority\n  assignee_id\n  issue_labelsCollection {\n    edges {\n      node {\n        label_id\n        nodeId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "69ba858303c571ceff0912a0b10c9194";

export default node;
