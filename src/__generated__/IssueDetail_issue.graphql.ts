/**
 * @generated SignedSource<<0711593b41dbda3be8fb24cae1f2bf47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueDetail_issue$data = {
  readonly created_at: string;
  readonly issue_labelsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly labels: {
          readonly color: string;
          readonly id: string;
          readonly name: string;
        } | null | undefined;
      };
    }>;
  } | null | undefined;
  readonly nodeId: string;
  readonly title: string;
  readonly users: {
    readonly avatar_url: string | null | undefined;
    readonly name: string;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"CommentThread_issue" | "IssueEditForm_issue">;
  readonly " $fragmentType": "IssueDetail_issue";
};
export type IssueDetail_issue$key = {
  readonly " $data"?: IssueDetail_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueDetail_issue">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssueDetail_issue",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nodeId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatar_url",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    (v0/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "color",
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
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "IssueEditForm_issue"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CommentThread_issue"
    }
  ],
  "type": "issues",
  "abstractKey": null
};
})();

(node as any).hash = "2dfbe0e9055952ce57d4b658f338d79d";

export default node;
