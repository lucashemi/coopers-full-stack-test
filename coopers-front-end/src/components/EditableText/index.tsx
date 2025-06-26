import { useEffect, useRef, useState } from "react";

interface EditableTextProps {
  initialValue: string;
  onConfirm: (newValue: string) => void;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean; // activate input focus (can cause autoscroll issues with drag-and-drop)
}

export function EditableText({
  initialValue,
  onConfirm,
  className,
  inputClassName,
  autoFocus = false,
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [tempValue, setTempValue] = useState(initialValue);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && autoFocus && inputRef.current) {
      inputRef.current.focus();
      const input = inputRef.current;
      if (input) {
        const length = input.value.length;
        input.setSelectionRange(length, length);
      }
    }
  }, [editing, autoFocus]);

  const confirmEdit = () => {
    const trimmed = tempValue.trim();
    if (trimmed && trimmed !== value) {
      setValue(trimmed);
      onConfirm(trimmed);
    }
    setEditing(false);
  };

  const cancelEdit = () => {
    setTempValue(value);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      confirmEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return editing ? (
    <input
      ref={inputRef}
      className={inputClassName}
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={confirmEdit}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span
      role="button"
      title="Click to edit"
      className={className}
      aria-pressed={editing}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setEditing(true);
          setTempValue(value);
        }
      }}
      onClick={() => {
        setEditing(true);
        setTempValue(value);
      }}
    >
      {value}
    </span>
  );
}
