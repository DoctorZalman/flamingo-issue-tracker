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

// Maps raw UUID → Relay nodeId for UPDATE/DELETE lookups
const uuidToNodeId = new Map<string, string>();

export function useRealtimeIssues(initialNodeIds: { uuid: string; nodeId: string }[] = []) {
  const environment = useRelayEnvironment();

  // Seed the map with records from initial query load
  useEffect(() => {
    initialNodeIds.forEach(({ uuid, nodeId }) => {
      uuidToNodeId.set(uuid, nodeId);
    });
  }, [initialNodeIds]);

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
        const nodeId = `issues:${issue.id}`;
        uuidToNodeId.set(issue.id, nodeId);

        const root = store.getRoot();
        const connection = ConnectionHandler.getConnection(
          root,
          "IssueList_query_issuesCollection"
        );
        if (!connection) return;

        // Avoid duplicate inserts
        const existing = store.get(nodeId);
        if (existing) return;

        const record = store.create(nodeId, "issues");
        record.setValue(nodeId, "nodeId");
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
