/**
 * @generated SignedSource<<9a50508f8d57e7b8f9636c3e43f855ad>>
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
    }
  ],
  "type": "issues",
  "abstractKey": null
};

(node as any).hash = "75adb04c4227a36529ec7722d908dd64";

export default node;
