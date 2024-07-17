import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { userUsernameSearch } from "@/actions/user";
import { toast } from "sonner";

const getTableData = (page = 1, pageSize = 5, totalData: any) => {
  const { length } = totalData;
  const tableData = {
    data: [],
    page,
    pageSize,
    length,
  };
  if (pageSize >= length) {
    tableData.data = totalData;
    tableData.page = 1;
  } else {
    const num = pageSize * (page - 1);
    if (num < length) {
      const startIndex = num;
      const endIndex = num + pageSize - 1;
      tableData.data = totalData.filter(
        (_: any, index: any) => index >= startIndex && index <= endIndex
      );
    } else {
      const size = length / pageSize;
      const rest = length % pageSize;
      if (rest > 0) {
        tableData.page = size + 1;
        tableData.data = totalData.filter(
          (_: any, index: any) => index >= pageSize * size && index <= length
        );
      } else if (rest === 0) {
        tableData.page = size;
        tableData.data = totalData.filter(
          (_: any, index: any) =>
            index >= pageSize * (size - 1) && index <= length
        );
      }
    }
  }
  return tableData;
};

function Page({ data, callback }: { data: any; callback: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user: any) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast("Selected", {
                    description: `User ${user.username} selected`,
                  });
                  callback({ userID: user.id });
                }}
              >
                Select
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function UsernameSearch({
  username,
  callback,
}: {
  username: string;
  callback: ({ userID }: { userID: number }) => void;
}) {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, isLoading, isError } = userUsernameSearch({
    findUsername: username,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const users = data.data.users;
  const pageSize = 5;
  const { data: tableData } = getTableData(pageIndex, pageSize, users);
  const hasPrevious = pageIndex > 1;
  const hasNext = pageIndex < users.length / pageSize;
  return (
    <div>
      <Page data={tableData} callback={callback} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={
                hasPrevious ? undefined : "pointer-events-none opacity-50"
              }
              onClick={() => setPageIndex(pageIndex - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              className={hasNext ? undefined : "pointer-events-none opacity-50"}
              onClick={() => setPageIndex(pageIndex + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
