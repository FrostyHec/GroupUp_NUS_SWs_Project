import { MoreHorizontal, PlusCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const allMembers = [
  {
    id: 1,
    username: 'a',
    role: 'owner',
    surveyStatus: 'completed',
  },
  {
    id: 2,
    username: 'b',
    role: 'member',
    surveyStatus: 'incomplete',
  },
];

const groupedMembers = [
  {
    id: 1,
    username: 'a',
    role: 'owner',
    surveyStatus: 'completed',
  },
];

const ungroupedMembers = [
  {
    id: 2,
    username: 'b',
    role: 'member',
    surveyStatus: 'incomplete',
  },
];

export function MembersTable({ members }: any) {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Survey Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member: any) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.username}</TableCell>
                <TableCell>
                  <Badge variant="outline">{member.surveyStatus}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          {members.length} members
        </div>
      </CardFooter>
    </Card>
  );
}

export default function Members() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="grouped">Grouped</TabsTrigger>
              <TabsTrigger value="ungrouped">Ungrouped</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Members
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <MembersTable members={allMembers} />
          </TabsContent>
          <TabsContent value="grouped">
            <MembersTable members={groupedMembers} />
          </TabsContent>
          <TabsContent value="ungrouped">
            <MembersTable members={ungroupedMembers} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
