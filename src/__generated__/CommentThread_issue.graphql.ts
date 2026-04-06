/**
 * @generated SignedSource<<bf0178686c4bb139a4fcc2dfb73691aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentThread_issue$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useCommentThread_issue">;
  readonly " $fragmentType": "CommentThread_issue";
};
export type CommentThread_issue$key = {
  readonly " $data"?: CommentThread_issue$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommentThread_issue">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommentThread_issue",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCommentThread_issue"
    }
  ],
  "type": "issues",
  "abstractKey": null
};

(node as any).hash = "ace49ac49c6a523ab00bf2e5b1d8007e";

export default node;
