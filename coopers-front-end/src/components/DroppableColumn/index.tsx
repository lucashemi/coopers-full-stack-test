import { useDroppable } from "@dnd-kit/core";

export function DroppableColumn({
  id,
  children,
}: {
  id: string;
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
