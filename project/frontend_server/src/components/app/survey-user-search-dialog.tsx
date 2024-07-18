"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UsernameSearch } from "@/controller/components-survey-user-search-dialog";
import { useSWRConfig } from "swr";

export function SurveyUserSearchDialog({
  excludeIDs,
  callback,
  children,
}: {
  excludeIDs: number[];
  callback: ({ userID }: { userID: any }) => void;
  children: React.ReactNode;
}) {
  const { mutate } = useSWRConfig();

  const [username, setUsername] = useState("");
  const [selectedUserID, setSelectedUserID] = useState(0);

  const handleInputChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleSelectUser = ({ userID }: { userID: number }) => {
    setSelectedUserID(userID);
  };

  const handleSubmit = () => {
    callback({ userID: selectedUserID });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Searching users by username</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <Button className="px-3">Search</Button>
        </div>
        <UsernameSearch
          username={username}
          excludeIDs={excludeIDs}
          callback={handleSelectUser}
        />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setSelectedUserID(0)}
            >
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={selectedUserID <= 0}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
