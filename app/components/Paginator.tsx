import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pagination as PaginationType, ParamsPagination } from "@/types";
export default function Paginator({
  pagination,
  params,
}: {
  pagination: PaginationType;
  params: ParamsPagination;
}) {
  if (typeof pagination === "undefined" || !pagination.total) {
    return;
  }

  const { searchParam: search, sizeParam: size } = params;

  const slug = `${search && `&search=${search}`}${size && `&size=${size}`}`;

  return (
    <Pagination>
      <PaginationContent>
        {!pagination.isFirt && (
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${pagination.prev?.toString()}${slug}`}
            />
          </PaginationItem>
        )}

        {pagination.actualPage! - 2 > 0 && (
          <PaginationItem>
            <PaginationLink href={`?page=${pagination.actualPage! - 2}${slug}`}>
              {pagination.actualPage! - 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {pagination.actualPage! - 1 > 0 && (
          <PaginationItem>
            <PaginationLink href={`?page=${pagination.actualPage! - 1}${slug}`}>
              {pagination.actualPage! - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            href={`?page=${pagination.actualPage?.toString()}${slug}`}
            isActive
          >
            {pagination.actualPage}
          </PaginationLink>
        </PaginationItem>
        {pagination.actualPage! + 1 < pagination.total! && (
          <PaginationItem>
            <PaginationLink href={`?page=${pagination.actualPage! + 1}${slug}`}>
              {pagination.actualPage! + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {pagination.actualPage! + 2 < pagination.total! && (
          <PaginationItem>
            <PaginationLink href={`?page=${pagination.actualPage! + 2}${slug}`}>
              {pagination.actualPage! + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {!pagination.isLast && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`?page=${pagination.total?.toString()}${slug}`}
              >
                {pagination.total}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={`?page=${pagination.next?.toString()}${slug}`}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
