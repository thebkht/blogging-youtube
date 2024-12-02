import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
} from "novel";
import { generateJSON } from "@tiptap/html";
import { postFormSchema } from "@/lib/types";
import { slashCommand, suggestionItems } from "./editor/slash-command";
import { Separator } from "../ui/separator";
import { NodeSelector } from "./editor/selectors/node-selector";
import { LinkSelector } from "./editor/selectors/link-selector";
import { TextButtons } from "./editor/selectors/text-buttons";
import { ColorSelector } from "./editor/selectors/color-selector";
import { useState } from "react";
import { defaultExtensions } from "./editor/extensions";
import { handleCommandNavigation, ImageResizer } from "novel/extensions";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./editor/image-upload";

export function ContentField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof postFormSchema>>;
}) {
  const extensions = [...defaultExtensions, slashCommand];
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  return (
    <>
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <EditorRoot>
                <EditorContent
                  immediatelyRender={false}
                  initialContent={generateJSON(field.value, defaultExtensions)}
                  onUpdate={({ editor }) => {
                    const html = editor.getHTML();
                    form.setValue("content", html);
                  }}
                  extensions={extensions}
                  editorProps={{
                    handleDOMEvents: {
                      keydown: (_view, event) => handleCommandNavigation(event),
                    },
                    handlePaste: (view, event) =>
                      handleImagePaste(view, event, uploadFn),
                    handleDrop: (view, event, _slice, moved) =>
                      handleImageDrop(view, event, moved, uploadFn),
                    attributes: {
                      class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
                    },
                  }}
                  slotAfter={<ImageResizer />}
                  className="rounded-xl border"
                >
                  <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                    <EditorCommandEmpty className="px-2 text-muted-foreground">
                      No results
                    </EditorCommandEmpty>
                    <EditorCommandList>
                      {suggestionItems.map((item) => (
                        <EditorCommandItem
                          value={item.title}
                          onCommand={(val) => item.command?.(val)}
                          className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent`}
                          key={item.title}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </EditorCommandItem>
                      ))}
                    </EditorCommandList>
                  </EditorCommand>
                  <EditorBubble
                    tippyOptions={{
                      placement: "bottom-start",
                    }}
                    className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
                  >
                    <Separator orientation="vertical" />
                    <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                    <Separator orientation="vertical" />

                    <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                    <Separator orientation="vertical" />
                    <TextButtons />
                    <Separator orientation="vertical" />
                    <ColorSelector
                      open={openColor}
                      onOpenChange={setOpenColor}
                    />
                  </EditorBubble>
                </EditorContent>
              </EditorRoot>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
