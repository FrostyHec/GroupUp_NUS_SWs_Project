import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { surveyUpdateStatus } from "@/actions/survey";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

function PublishFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const cookies = useCookies();
  const token = cookies.get("token") as string;

  async function publishForm() {
    try {
      const { data } = await surveyUpdateStatus({
        token: token,
        surveyID: id,
        status: "open",
      });
      if (!data) {
        throw new Error("Failed to update form status");
      }
      toast({
        title: "Success",
        description: "Your form is now available to the public",
      });
      router.push(`/survey/${id}/dashboard`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form and the personal information setting. <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the members
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;
