import { useState, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useRowSelection } from "@/hooks/use-row-selection";

export interface DataTableParams {
  page: number;
  pageSize: number;
  search: string;
  filters: Record<string, string[]>;
  /** Call your API with these params */
}

export interface UseDataTableOptions<T extends string | number> {
  /** Row ids for selection tracking */
  ids: T[];
  /** Initial page size */
  defaultPageSize?: number;
  /** Filter keys to manage (e.g. ["status", "role"]) */
  filterKeys?: string[];
  /** Debounce delay for search in ms */
  searchDebounce?: number;
}

export function useDataTable<T extends string | number>({
  ids,
  defaultPageSize = 10,
  filterKeys = [],
  searchDebounce = 300,
}: UseDataTableOptions<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(String(defaultPageSize));
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, Set<string>>>(() =>
    Object.fromEntries(filterKeys.map((k) => [k, new Set<string>()])),
  );

  const debouncedSearch = useDebounce(search, searchDebounce);
  const selection = useRowSelection(ids);

  const toggleFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => {
      const next = new Set(prev[key]);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...prev, [key]: next };
    });
    setPage(1);
  }, []);

  const clearFilter = useCallback((key: string) => {
    setFilters((prev) => ({ ...prev, [key]: new Set() }));
    setPage(1);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(Object.fromEntries(filterKeys.map((k) => [k, new Set<string>()])));
    setPage(1);
  }, [filterKeys]);

  const hasActiveFilters = filterKeys.some((k) => filters[k]?.size > 0);

  function handlePageSizeChange(size: string) {
    setPageSize(size);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  /** API-ready params — use in useEffect to fetch data */
  const params: DataTableParams = {
    page,
    pageSize: Number(pageSize),
    search: debouncedSearch,
    filters: Object.fromEntries(filterKeys.map((k) => [k, Array.from(filters[k] ?? [])])),
  };

  return {
    // pagination
    page,
    pageSize,
    setPage,
    onPageSizeChange: handlePageSizeChange,
    // search
    search,
    debouncedSearch,
    onSearchChange: handleSearchChange,
    // filters
    filters,
    toggleFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    // selection
    ...selection,
    // api params
    params,
  };
}
