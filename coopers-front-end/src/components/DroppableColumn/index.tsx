import { useDroppable } from "@dnd-kit/core";
import type { ColumnName } from "../../types/ColumnName";

export function DroppableColumn({
  id,
  children,
}: {
  id: ColumnName;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      column: id, // "To-do" or "Done"
    },
  });

  return <div ref={setNodeRef}>{children}</div>;
}
