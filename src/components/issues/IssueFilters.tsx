"use client";

import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { Select } from "@/components/ui/Select";
import { PRIORITY_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from "@/lib/constants";
import { IssueFiltersLabelEdge } from "@/types/issues";

const labelsQuery = graphql`
  query IssueFiltersQuery {
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

interface IssueFiltersProps {
  status: string;
  priority: string;
  selectedLabelIds: Set<string>;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onLabelToggle: (id: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function IssueFilters({
  status,
  priority,
  selectedLabelIds,
  onStatusChange,
  onPriorityChange,
  onLabelToggle,
  hasActiveFilters,
  onClearFilters,
}: IssueFiltersProps) {
  const data = useLazyLoadQuery(labelsQuery, {});
  const labels = data.labelsCollection?.edges ?? [];

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex flex-wrap gap-3">
        <Select
          value={status}
          name="status"
          aria-label="status"
          options={STATUS_FILTER_OPTIONS}
          onChange={(e) => onStatusChange(e.target.value)}
        />
        <Select
          value={priority}
          name="priority"
          aria-label="priority"
          options={PRIORITY_FILTER_OPTIONS}
          onChange={(e) => onPriorityChange(e.target.value)}
        />
      </div>

      {labels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {labels.map((edge: IssueFiltersLabelEdge) => {
            const label = edge.node;
            const selected = selectedLabelIds.has(label.id);
            return (
              <button
                key={label.id}
                type="button"
                onClick={() => onLabelToggle(label.id)}
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
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#ffc008] dark:hover:text-[#ffc008] transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
