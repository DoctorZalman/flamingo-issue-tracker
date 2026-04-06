import type { IssueList_query$data } from "@/__generated__/IssueList_query.graphql";
import type { IssueListItem_issue$data } from "@/__generated__/IssueListItem_issue.graphql";
import type { IssueDetail_issue$data } from "@/__generated__/IssueDetail_issue.graphql";
import type { IssueEditForm_issue$data } from "@/__generated__/IssueEditForm_issue.graphql";
import type { useIssueEditFormQuery$data } from "@/__generated__/useIssueEditFormQuery.graphql";

export type IssueListEdge = NonNullable<IssueList_query$data["issuesCollection"]>["edges"][number];

export type IssueListItemLabelEdge = NonNullable<
  IssueListItem_issue$data["issue_labelsCollection"]
>["edges"][number];

export type IssueDetailLabelEdge = NonNullable<
  IssueDetail_issue$data["issue_labelsCollection"]
>["edges"][number];

export type IssueEditFormLabelEdge = NonNullable<
  IssueEditForm_issue$data["issue_labelsCollection"]
>["edges"][number];

export type IssueEditFormUserEdge = NonNullable<
  useIssueEditFormQuery$data["usersCollection"]
>["edges"][number];

export type IssueEditFormAllLabelEdge = NonNullable<
  useIssueEditFormQuery$data["labelsCollection"]
>["edges"][number];
