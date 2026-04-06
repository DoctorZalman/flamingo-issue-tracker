"use client";

import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useIssueEditForm } from "@/hooks/useIssueEditForm";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/lib/constants";
import type { IssueEditForm_issue$key } from "@/__generated__/IssueEditForm_issue.graphql";
import type { IssueEditFormLabelEdge, IssueEditFormAllLabelEdge } from "@/types/issues";

const fragment = graphql`
  fragment IssueEditForm_issue on issues {
    nodeId
    id
    title
    description
    status
    priority
    assignee_id
    issue_labelsCollection {
      edges {
        node {
          label_id
        }
      }
    }
  }
`;

export function IssueEditForm({ issueRef }: { issueRef: IssueEditForm_issue$key }) {
  const issue = useFragment(fragment, issueRef);

  const currentLabelIds = new Set<string>(
    issue.issue_labelsCollection?.edges.map(
      (e: IssueEditFormLabelEdge) => e.node.label_id as string
    ) ?? []
  );

  const {
    titleRef,
    descriptionRef,
    statusRef,
    priorityRef,
    assigneeRef,
    errors,
    isDirty,
    isUpdating,
    selectedLabelIds,
    allLabels,
    userOptions,
    markDirty,
    toggleLabel,
    handleSave,
  } = useIssueEditForm({ nodeId: issue.nodeId, id: issue.id, currentLabelIds });

  return (
    <section aria-label="Edit issue" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="issue-title">Title</Label>
        <input
          id="issue-title"
          ref={titleRef}
          defaultValue={issue.title}
          onChange={markDirty}
          autoComplete="off"
          className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ffc008]"
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="issue-description">Description</Label>
        <Textarea
          id="issue-description"
          ref={descriptionRef}
          defaultValue={issue.description ?? ""}
          rows={4}
          placeholder="Add a description..."
          onChange={markDirty}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <Label htmlFor="issue-status">Status</Label>
          <Select
            id="issue-status"
            name="status"
            ref={statusRef}
            defaultValue={issue.status}
            options={STATUS_OPTIONS}
            onChange={markDirty}
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <Label htmlFor="issue-priority">Priority</Label>
          <Select
            id="issue-priority"
            name="priority"
            ref={priorityRef}
            defaultValue={issue.priority}
            options={PRIORITY_OPTIONS}
            onChange={markDirty}
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <Label htmlFor="issue-assignee">Assignee</Label>
          <Select
            id="issue-assignee"
            name="assignee"
            ref={assigneeRef}
            defaultValue={issue.assignee_id ?? ""}
            options={userOptions}
            onChange={markDirty}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Labels</Label>
        <div className="flex flex-wrap gap-2">
          {allLabels.map((edge: IssueEditFormAllLabelEdge) => {
            const label = edge.node;
            const selected = selectedLabelIds.has(label.id);
            return (
              <button
                key={label.id}
                type="button"
                onClick={() => toggleLabel(label.id)}
                className="text-xs px-3 py-1 rounded-full border-2 transition-all cursor-pointer"
                style={{
                  backgroundColor: selected ? label.color : "transparent",
                  borderColor: label.color,
                  color: selected ? "#fff" : label.color,
                }}
              >
                {label.name}
              </button>
            );
          })}
        </div>
      </div>

      <Button onClick={handleSave} disabled={isUpdating || !isDirty} className="self-end">
        {isUpdating ? "Saving..." : "Save changes"}
      </Button>
    </section>
  );
}
