/**
 * @generated SignedSource<<891b7c87c153e9b2e751c8f726a37db0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentItem_comment$data = {
  readonly body: string;
  readonly created_at: string;
  readonly nodeId: string;
  readonly users: {
    readonly avatar_url: string | null | undefined;
    readonly name: string;
  } | null | undefined;
  readonly " $fragmentType": "CommentItem_comment";
};
export type CommentItem_comment$key = {
  readonly " $data"?: CommentItem_comment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommentItem_comment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommentItem_comment",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "comments",
  "abstractKey": null
};

(node as any).hash = "1c40aea339daf93455bff8dff72d774b";

export default node;
