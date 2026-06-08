import { ReactNode, useRef } from "react";
import styles from "./Paginator.module.css";
import { PageSelector } from "./PageSelector";
import { useVersionGroupName } from "../hooks/useVersionGroupName";

interface PaginatorProps<T> {
  setPage: (page: number) => void;
  currentPage: number;
  pageSize: number;
  emptyState: ReactNode;
  items: T[];
  renderPage: (items: T[]) => ReactNode;
}

export function Paginator<T>({
  setPage,
  currentPage,
  pageSize,
  emptyState,
  items,
  renderPage,
}: PaginatorProps<T>): ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);
  const numPages = Math.ceil(items.length / pageSize);
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < numPages - 1;
  const i = pageSize * currentPage;
  const pageItems = items.slice(i, i + pageSize);
  const title = useVersionGroupName();
  return (
    <div ref={rootRef} className={styles.root}>
      <PageSelector
        anchorElementRef={rootRef}
        location="top"
        numItems={items.length}
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        setPage={setPage}
        title={title}
      />
      {pageItems.length === 0 ? emptyState : renderPage(pageItems)}
      <PageSelector
        anchorElementRef={rootRef}
        location="bottom"
        numItems={items.length}
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        setPage={setPage}
        title={title}
      />
    </div>
  );
}
