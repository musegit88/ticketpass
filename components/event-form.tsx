"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/validator";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import Listbox from "./ui/listbox";
import ImageUploader from "./ui/image-uploader";
import { CalendarRange, DollarSign, Link, Loader2, MapPin } from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useUploadThing } from "@/lib/uploadthing";
import { createEvent, updateEvent } from "@/app/actions/event.actions";
import { useRouter } from "next/navigation";
import { EventProps } from "@/types/types";

interface EventFormProps {
  userId: string;
  eventId?: string;
  event?: EventProps;
  type: "Create" | "Update";
}
const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      event && type === "Update"
        ? {
            ...event,
            startTime: new Date(event.startTime),
            endTime: new Date(event.endTime),
          }
        : {
            title: "",
            categoryId: "",
            description: "",
            location: "",
            isOnline: false,
            imageUrl: "",
            isFree: false,
            price: "",
            startTime: new Date(),
            endTime: new Date(),
            url: "",
          },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let uploadedImageUrl = values.imageUrl;
    if (images.length > 0) {
      const uploadedImages = await startUpload(images);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });
        if (newEvent) {
          form.reset();
          router.refresh();
          router.push(`/events/${newEvent.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          eventId,
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: `/events/${eventId}`,
        });
        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="AI Hackathon " {...field} />
                </FormControl>
                <FormDescription>Add title for your event.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Listbox
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Select category for your event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="" {...field} className="resize-none" />
                </FormControl>
                <FormDescription>Description for your event.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <ImageUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setImages={setImages}
                  />
                </FormControl>
                <FormDescription>Image for your event.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex w-full">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center w-full overflow-hidden rounded-md bg-slate-400/20 px-2">
                      <MapPin size={18} />
                      <Input
                        placeholder="New York, USA"
                        {...field}
                        className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Event location or online.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isOnline"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center justify-end w-full overflow-hidden rounded-r-md bg-slate-400/20 px-2 py-3">
                      <Label
                        htmlFor="isOnline"
                        className="whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-50 pr-3 cursor-pointer"
                      >
                        Online
                      </Label>
                      <Checkbox
                        id="isOnline"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center w-full overflow-hidden rounded-md bg-slate-400/20 px-2">
                    <Link size={18} />
                    <Input
                      placeholder="www.example.com, @next"
                      {...field}
                      className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormDescription>Social or Website.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center w-full overflow-hidden rounded-md bg-slate-400/20 px-2 py-2">
                    <CalendarRange size={18} />
                    <p className="ml-2 whitespace-nowrap text-sm text-muted-foreground">
                      Start Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormDescription>Event start time and date</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center w-full overflow-hidden rounded-md bg-slate-400/20 px-2 py-2">
                    <CalendarRange size={18} />
                    <p className="ml-2 whitespace-nowrap text-sm text-muted-foreground">
                      End Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormDescription>Event ending time and date.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center w-full overflow-hidden rounded-l-md bg-slate-400/20 px-2">
                      <DollarSign size={18} />
                      <Input
                        placeholder="Price"
                        type="number"
                        min="0"
                        {...field}
                        className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center justify-end w-full overflow-hidden rounded-r-md bg-slate-400/20 px-2 py-3">
                      <Label
                        htmlFor="isFree"
                        className="whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-50 pr-3 cursor-pointer"
                      >
                        Free
                      </Label>
                      <Checkbox
                        id="isFree"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              `${type} Event`
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
