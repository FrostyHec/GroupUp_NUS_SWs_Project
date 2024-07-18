import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { userUsernameSearch } from "@/actions/user";

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
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user: any) => (
          <TableRow key={user.id}>
            <TableCell>{user.username}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => callback({ userID: user.id })}
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
  const { users } = userUsernameSearch({ findUsername: username }).data.data;
  const { data } = getTableData(pageIndex, 5, users);
  return (
    <div>
      <Page data={data} callback={callback} />
      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
    </div>
  );
}
