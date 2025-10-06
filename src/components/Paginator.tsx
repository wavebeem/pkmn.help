import { ReactNode, useRef } from "react";
import styles from "./Paginator.module.css";
import { PageSelector } from "./PageSelector";

interface PaginatorProps<T> {
  setPage: (page: number) => void;
  currentPage: number;
  pageSize: number;
  emptyState: ReactNode;
  items: T[];
  renderPage: (items: T[]) => ReactNode;
  renderID: (item: T) => ReactNode;
}

export function Paginator<T>({
  setPage,
  currentPage,
  pageSize,
  emptyState,
  items,
  renderPage,
  renderID,
}: PaginatorProps<T>): ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);
  const numPages = Math.ceil(items.length / pageSize);
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < numPages - 1;
  const i = pageSize * currentPage;
  const pageItems = items.slice(i, i + pageSize);
  return (
    <div ref={rootRef} className={styles.root}>
      <PageSelector
        anchorElementRef={rootRef}
        location="top"
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        setPage={setPage}
        renderID={renderID}
      />
      {pageItems.length === 0 ? emptyState : renderPage(pageItems)}
      <PageSelector
        anchorElementRef={rootRef}
        location="bottom"
        numPages={numPages}
        pageItems={pageItems}
        hasPrev={hasPrev}
        hasNext={hasNext}
        currentPage={currentPage}
        setPage={setPage}
        renderID={renderID}
      />
    </div>
  );
}
