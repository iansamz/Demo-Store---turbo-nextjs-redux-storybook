import { toast } from "sonner";
import { Button } from "@repo/ui/components/button";

export interface ToastStoryProps {
  type: "promise" | "success" | "error" | "info";
}

export const ToastStory = ({ type }: ToastStoryProps) => {
  const successToast = () => {
    toast.success("Success toast has been added");
  };

  const errorToast = () => {
    toast.error("Error toast has been added");
  };

  const infoToast = () => {
    toast.info("Info toast has been added");
  };

  const promiseToast = () => {
    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: "Sonner" }), 2000),
      ) as Promise<{ name: string }>;

    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => {
        return `${data.name} toast has been added`;
      },
      error: "Error",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  let toastToShow;
  switch (type) {
    case "success":
      toastToShow = successToast();
      break;
    case "error":
      toastToShow = errorToast();
      break;
    case "info":
      toastToShow = infoToast();
      break;
    case "promise":
      toastToShow = promiseToast();
      break;
  }

  return <Button onClick={() => toastToShow}>Show Toast</Button>;
};
