/**
 * @generated SignedSource<<20bab50cd0a3cee7cebca39759155f06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StatusSelector_issue$data = {
  readonly nodeId: string;
  readonly status: string;
  readonly " $fragmentType": "StatusSelector_issue";
};
export type StatusSelector_issue$key = {
  readonly " $data"?: StatusSelector_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"StatusSelector_issue">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StatusSelector_issue",
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
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "issues",
  "abstractKey": null
};

(node as any).hash = "c82b7c1fe8f46dd96b0da0e1ad1e26e9";

export default node;
