"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

export function SurveyUserSearch({
  callback,
  children,
}: {
  callback: ({ userID }: { userID: any }) => void;
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState("");

  const handleInputChange = (e: any) => {
    setUserId(e.target.value);
  };

  const handleSubmit = () => {
    callback({ userID: userId });
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
            <Label htmlFor="id" className="sr-only">
              Link
            </Label>
            <Input
              id="user_id"
              defaultValue="User ID"
              value={userId}
              onChange={handleInputChange}
            />
          </div>
          <Button className="px-3">Search</Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
