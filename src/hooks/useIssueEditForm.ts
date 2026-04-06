import { useMutation, useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { IssueEditSchema } from "@/lib/zod-schemas";
import type { IssueEditFormUserEdge } from "@/types/issues";

const deleteLabelsMutation = graphql`
  mutation useIssueEditFormDeleteLabelsMutation($issueId: UUID!) {
    deleteFromissue_labelsCollection(filter: { issue_id: { eq: $issueId } }, atMost: 10) {
      records {
        issue_id
        label_id
      }
    }
  }
`;

const insertLabelsMutation = graphql`
  mutation useIssueEditFormInsertLabelsMutation($objects: [issue_labelsInsertInput!]!) {
    insertIntoissue_labelsCollection(objects: $objects) {
      records {
        issue_id
        label_id
      }
    }
  }
`;

const updateMutation = graphql`
  mutation useIssueEditFormUpdateMutation(
    $nodeId: ID!
    $title: String!
    $description: String
    $status: String!
    $priority: String!
    $assigneeId: UUID
  ) {
    updateissuesCollection(
      filter: { nodeId: { eq: $nodeId } }
      set: {
        title: $title
        description: $description
        status: $status
        priority: $priority
        assignee_id: $assigneeId
      }
    ) {
      records {
        nodeId
        title
        description
        status
        priority
        assignee_id
      }
    }
  }
`;

const usersAndLabelsQuery = graphql`
  query useIssueEditFormQuery {
    usersCollection {
      edges {
        node {
          id
          name
        }
      }
    }
    labelsCollection {
      edges {
        node {
          id
          name
          color
        }
      }
    }
  }
`;

interface UseIssueEditFormProps {
  nodeId: string;
  id: string;
  currentLabelIds: Set<string>;
}

export function useIssueEditForm({ nodeId, id, currentLabelIds }: UseIssueEditFormProps) {
  const [commitUpdate, isUpdating] = useMutation(updateMutation);
  const [commitDeleteLabels] = useMutation(deleteLabelsMutation);
  const [commitInsertLabels] = useMutation(insertLabelsMutation);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [selectedLabelIds, setSelectedLabelIds] = useState<Set<string>>(currentLabelIds);

  const queryData = useLazyLoadQuery(usersAndLabelsQuery, {});
  const users = queryData.usersCollection?.edges ?? [];
  const allLabels = queryData.labelsCollection?.edges ?? [];

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const assigneeRef = useRef<HTMLSelectElement>(null);

  const markDirty = () => setIsDirty(true);

  const toggleLabel = (labelId: string) => {
    setIsDirty(true);
    setSelectedLabelIds((prev) => {
      const next = new Set(prev);
      if (next.has(labelId)) {
        next.delete(labelId);
      } else {
        next.add(labelId);
      }
      return next;
    });
  };

  const handleSave = () => {
    const values = {
      title: titleRef.current?.value ?? "",
      description: descriptionRef.current?.value ?? "",
      status: statusRef.current?.value ?? "",
      priority: priorityRef.current?.value ?? "",
    };

    const result = IssueEditSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((e) => {
        const key = e.path[0];
        if (key !== undefined) fieldErrors[String(key)] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const assigneeId = assigneeRef.current?.value || null;

    commitUpdate({
      variables: { nodeId, ...result.data, assigneeId },
      onCompleted: () => {
        setIsDirty(false);
        commitDeleteLabels({
          variables: { issueId: id },
          onCompleted: () => {
            if (selectedLabelIds.size === 0) {
              toast.success("Issue updated");
              return;
            }
            commitInsertLabels({
              variables: {
                objects: Array.from(selectedLabelIds).map((labelId) => ({
                  issue_id: id,
                  label_id: labelId,
                })),
              },
              onCompleted: () => toast.success("Issue updated"),
              onError: () => toast.error("Failed to update labels"),
            });
          },
          onError: () => toast.error("Failed to update labels"),
        });
      },
      onError: () => toast.error("Failed to update issue"),
    });
  };

  const userOptions = [
    { value: "", label: "Unassigned" },
    ...users.map((e: IssueEditFormUserEdge) => ({ value: e.node.id, label: e.node.name })),
  ];

  return {
    // refs
    titleRef,
    descriptionRef,
    statusRef,
    priorityRef,
    assigneeRef,
    // state
    errors,
    isDirty,
    isUpdating,
    selectedLabelIds,
    allLabels,
    userOptions,
    // handlers
    markDirty,
    toggleLabel,
    handleSave,
  };
}
