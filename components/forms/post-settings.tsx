import { useIsMobile } from "@/hooks/use-mobile";
import { postFormSchema } from "@/lib/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { isValidSlug, uploadImage } from "@/lib/actions";
import { AspectRatio } from "../ui/aspect-ratio";
import { toast } from "sonner";
import { TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import { toBase64 } from "@/lib/utils";

export function PostSettings({
  form,
  ...props
}: {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
     onClick: () => void;
} & React.ComponentProps<typeof Dialog>) {
  const isMobile = useIsMobile();
  const { data: session } = useSession();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);

  const content = (
    <React.Fragment key="settings">
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormDescription>
              https://example.com/{session?.user?.username}/
            </FormDescription>
            <FormControl>
              <Input
                placeholder="Slug..."
                value={field.value}
                onChange={async (e) => {
                  field.onChange(e.target.value);
                  const slug = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  if (slug.length === 0) {
                    setIsValid(true);
                    return;
                  }

                  const valid = await isValidSlug(slug);

                  setIsValid(valid);
                  console.log(form.getValues());
                }}
              />
            </FormControl>
            {!!isValid ? (
              <FormMessage className="text-green-400">
                This slug is available.
              </FormMessage>
            ) : (
              <FormMessage>This slug is already taken.</FormMessage>
            )}
          </FormItem>
        )}
        key="slug"
      />
      <FormField
        control={form.control}
        name="image"
        key="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cover Image</FormLabel>
            <FormDescription>
              Manage the image and short description for the post.
            </FormDescription>
            <FormControl>
              <div className="flex w-full items-center justify-center">
                <label className="relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-popover/50">
                  {field.value !== "" ? (
                    <AspectRatio ratio={16 / 9} className="rounded-md bg-muted">
                      <div
                        className="h-full w-full rounded-md bg-cover bg-center object-cover"
                        style={{
                          backgroundImage: `url(${
                            file
                              ? (URL.createObjectURL(file) as string)
                              : (field.value as string)
                          })`,
                        }}
                      />
                    </AspectRatio>
                  ) : (
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <UploadIcon className="mb-4 h-9 w-9" />
                      <p className="mb-2 text-sm font-medium text-secondary-foreground">
                        Click to upload
                      </p>
                      <p className="text-xs text-secondary-foreground">
                        PNG, JPG, GIF (MAX. 2MB)
                      </p>
                    </div>
                  )}
                  <Input
                    id="dropzone-file"
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={async (e) => {
                      const cover = e.target.files?.[0];
                      if (cover) {
                        if (cover.size > 2 * 1024 * 1024) {
                          toast.warning("File size must be less than 2MB.");
                        } else if (
                          !["image/png", "image/jpeg", "image/gif"].includes(
                            cover.type,
                          )
                        ) {
                          toast.warning("File type must be PNG, JPG, or GIF.");
                        } else {
                          setFile(cover);
                        }
                      }
                    }}
                    className="hidden"
                  />
                  <div className="absolute right-2 top-2 z-50 flex items-center justify-center gap-1">
                    {/* <Button
                        variant="secondary"
                        size={"icon"}
                        className="bg-secondary/60 backdrop-blur-md hover:bg-secondary"
                      >
                        <RefreshCcw className="h-4 w-4" />
                        <span className="sr-only">Refresh</span>
                      </Button> */}
                    <Button
                      variant="secondary"
                      size={"icon"}
                      className="bg-secondary/60 backdrop-blur-md hover:bg-secondary"
                      disabled={!file}
                      onClick={async () => {
                        const { url } = await uploadImage(
                          file as File,
                          form.getValues("slug"),
                        );
                        const base64 = await toBase64(file as File);
                        form.setValue("imageBlurhash", base64);
                        field.onChange(url);
                      }}
                    >
                      <UploadIcon className="h-4 w-4" />
                      <span className="sr-only">Upload</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size={"icon"}
                      className="bg-background/95 backdrop-blur hover:bg-secondary supports-[backdrop-filter]:bg-background/60"
                      disabled={!file}
                      onClick={() => {
                        setFile(null);
                        field.onChange("");
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" form="post-editor">Publish</Button>
    </React.Fragment>
  );

  if (isMobile) {
    return (
      <>
        <Drawer {...props}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Post Setting</DrawerTitle>
              <DrawerDescription>
                Configure the settings for your post.
              </DrawerDescription>
            </DrawerHeader>
            {content}
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <Dialog {...props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post Setting</DialogTitle>
            <DialogDescription>
              Configure the settings for your post.
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    </>
  );
}
