"use client";
import React, { startTransition } from "react";
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
} from "./alert-dialog";
import { Trash } from "lucide-react";
import { deleteEventById } from "@/app/actions/event.actions";
import { usePathname } from "next/navigation";

type DeleteModalProps = {
  eventId: string;
  eventName: string;
};

const DeleteModal = ({ eventId, eventName }: DeleteModalProps) => {
  const path = usePathname();
  const handleDeleteEvent = () => {
    deleteEventById(eventId, path);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-white rounded-md p-2 shadow-sm transition-all">
        <Trash size={14} />
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-bold text-black">{eventName}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-500/90"
            onClick={() => startTransition(handleDeleteEvent)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
