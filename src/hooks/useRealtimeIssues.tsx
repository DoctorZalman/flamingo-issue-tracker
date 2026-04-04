import { useEffect } from "react";
import { useRelayEnvironment } from "react-relay";
import { ConnectionHandler, commitLocalUpdate } from "relay-runtime";
import { supabase } from "@/lib/supabase";

interface IssuePayload {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee_id: string | null;
  description: string | null;
  created_at: string;
}

// Module-level map persists across renders
const uuidToNodeId = new Map<string, string>();

// Called from IssueList to register existing records
export function registerNodeId(uuid: string, nodeId: string) {
  uuidToNodeId.set(uuid, nodeId);
}

export function useRealtimeIssues() {
  const environment = useRelayEnvironment();

  useEffect(() => {
    const channel = supabase
      .channel("issues-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "issues" }, (payload) => {
        if (payload.eventType === "INSERT") {
          handleInsert(payload.new as IssuePayload);
        } else if (payload.eventType === "UPDATE") {
          handleUpdate(payload.new as IssuePayload);
        } else if (payload.eventType === "DELETE") {
          handleDelete((payload.old as { id: string }).id);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

    function handleInsert(issue: IssuePayload) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      commitLocalUpdate(environment, (store: any) => {
        // Check if record already exists by uuid
        const existingNodeId = uuidToNodeId.get(issue.id);
        if (existingNodeId && store.get(existingNodeId)) return;

        const root = store.getRoot();
        const connection = ConnectionHandler.getConnection(
          root,
          "IssueList_query_issuesCollection"
        );
        if (!connection) return;

        // Use uuid as temp nodeId until Relay assigns real one
        const tempNodeId = `issues:${issue.id}`;
        uuidToNodeId.set(issue.id, tempNodeId);

        const record = store.create(tempNodeId, "issues");
        record.setValue(tempNodeId, "nodeId");
        record.setValue(issue.id, "id");
        record.setValue(issue.title, "title");
        record.setValue(issue.status, "status");
        record.setValue(issue.priority, "priority");
        record.setValue(issue.created_at, "created_at");
        record.setValue(issue.assignee_id, "assignee_id");
        record.setValue(issue.description, "description");

        const edge = ConnectionHandler.createEdge(store, connection, record, "issuesEdge");
        ConnectionHandler.insertEdgeBefore(connection, edge);
      });
    }

    function handleUpdate(issue: IssuePayload) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      commitLocalUpdate(environment, (store: any) => {
        const nodeId = uuidToNodeId.get(issue.id) ?? `issues:${issue.id}`;
        const record = store.get(nodeId);
        if (!record) return;

        record.setValue(issue.title, "title");
        record.setValue(issue.status, "status");
        record.setValue(issue.priority, "priority");
        record.setValue(issue.description, "description");
      });
    }

    function handleDelete(id: string) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      commitLocalUpdate(environment, (store: any) => {
        const nodeId = uuidToNodeId.get(id) ?? `issues:${id}`;

        const root = store.getRoot();
        const connection = ConnectionHandler.getConnection(
          root,
          "IssueList_query_issuesCollection"
        );
        if (!connection) return;

        ConnectionHandler.deleteNode(connection, nodeId);
        uuidToNodeId.delete(id);
      });
    }
  }, [environment]);
}
