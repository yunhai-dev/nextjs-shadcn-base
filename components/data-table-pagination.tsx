"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps {
  page: number;
  totalPages: number;
  pageSize: string;
  pageSizeOptions?: string[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: string) => void;
}

export function DataTablePagination({
  page,
  totalPages,
  pageSize,
  pageSizeOptions = ["10", "20", "50"],
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const delta = 1;
  const left = page - delta;
  const right = page + delta;

  const pageItems: React.ReactNode[] = [];

  pageItems.push(
    <PaginationItem key={1}>
      <PaginationLink
        isActive={page === 1}
        onClick={() => onPageChange(1)}
        className="cursor-pointer"
      >
        1
      </PaginationLink>
    </PaginationItem>,
  );
  if (left > 2) {
    pageItems.push(
      <PaginationItem key="el">
        <PaginationEllipsis />
      </PaginationItem>,
    );
  }
  for (let p = Math.max(2, left); p <= Math.min(totalPages - 1, right); p++) {
    pageItems.push(
      <PaginationItem key={p}>
        <PaginationLink
          isActive={page === p}
          onClick={() => onPageChange(p)}
          className="cursor-pointer"
        >
          {p}
        </PaginationLink>
      </PaginationItem>,
    );
  }
  if (right < totalPages - 1) {
    pageItems.push(
      <PaginationItem key="er">
        <PaginationEllipsis />
      </PaginationItem>,
    );
  }
  if (totalPages > 1) {
    pageItems.push(
      <PaginationItem key={totalPages}>
        <PaginationLink
          isActive={page === totalPages}
          onClick={() => onPageChange(totalPages)}
          className="cursor-pointer"
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>每页显示</span>
        <Select
          value={pageSize}
          onValueChange={(v) => {
            onPageSizeChange(v);
            onPageChange(1);
          }}
        >
          <SelectTrigger className="w-16 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>行</span>
      </div>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <span className="text-sm text-muted-foreground px-2">
              第 {page} 页，共 {totalPages} 页
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationFirst
              onClick={() => onPageChange(1)}
              className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, page - 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          {pageItems}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              onClick={() => onPageChange(totalPages)}
              className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
