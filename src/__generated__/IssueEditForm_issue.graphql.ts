/**
 * @generated SignedSource<<354c76fc5e4c80508f572daa1081ddb3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueEditForm_issue$data = {
  readonly assignee_id: string | null | undefined;
  readonly description: string | null | undefined;
  readonly id: string;
  readonly issue_labelsCollection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly label_id: string;
      };
    }>;
  } | null | undefined;
  readonly nodeId: string;
  readonly priority: string;
  readonly status: string;
  readonly title: string;
  readonly " $fragmentType": "IssueEditForm_issue";
};
export type IssueEditForm_issue$key = {
  readonly " $data"?: IssueEditForm_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueEditForm_issue">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssueEditForm_issue",
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
      "name": "id",
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
    }
  ],
  "type": "issues",
  "abstractKey": null
};

(node as any).hash = "52e8614132e8e6b404dad80366600372";

export default node;
