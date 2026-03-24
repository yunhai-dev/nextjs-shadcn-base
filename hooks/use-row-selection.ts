import { useState } from "react";

export function useRowSelection<T extends string | number>(ids: T[]) {
  const [selected, setSelected] = useState<Set<T>>(new Set());

  const allSelected = selected.size === ids.length && ids.length > 0;
  const someSelected = selected.size > 0 && !allSelected;

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(ids));
  }

  function toggleOne(id: T) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function clearSelection() {
    setSelected(new Set());
  }

  return { selected, allSelected, someSelected, toggleAll, toggleOne, clearSelection };
}
