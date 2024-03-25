"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
// @ts-ignore
import type { FileWithPath } from "@uploadthing/react";

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { Upload } from "lucide-react";
import { Button } from "./button";

interface ImageUploaderProps {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setImages: Dispatch<SetStateAction<File[]>>;
}

const ImageUploader = ({
  onFieldChange,
  imageUrl,
  setImages,
}: ImageUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setImages(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center h-72 bg-slate-400/20 rounded-md cursor-pointer overflow-hidden"
    >
      <input {...getInputProps()} />
      {imageUrl ? (
        <div>
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center py-5">
          <Upload size={48} />
          <h4 className="mb-4 text-sm text-muted-foreground">
            Drag photo here
          </h4>
          <Button type="button">Select Images</Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
