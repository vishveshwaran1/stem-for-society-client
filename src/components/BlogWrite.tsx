import React, { useState } from "react";
import RichTextEditorNew from "./RichTextEditorNew.client";
import { queryClient } from "../lib/api";
import { Button, TagsInput, TextInput } from "@mantine/core";
import { useBlogStepper } from "../lib/hooks";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { AuthorDetails } from "./BlogAuthorDetails";

export type BlogContentType = {
  references?: string[];
  title: string;
  content: string;
};

export default function BlogWrite() {
  const { setActive } = useBlogStepper();
  const { data: blogAuthorDetails } = useQuery<AuthorDetails | undefined>({
    queryKey: ["blog", "authorDetails"],
    staleTime: Infinity,
    gcTime: Infinity,
  });
  // I am not sure if this is dangerous or not, I think I should be doing this inside an useEffect
  if (!blogAuthorDetails) setActive(0);

  const { data: blogContent } = useQuery<BlogContentType | undefined>({
    queryKey: ["blog", "content"],
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const [blog, setBlog] = useState<BlogContentType>(
    blogContent ?? {
      content: "",
      title: "",
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !blog?.content ||
      (blog?.content.replace(/<(.|\n)*?>/g, "").trim() === "" &&
        !blog?.content.includes("<img"))
    ) {
      toast.error("No content to save");
      return;
    }
    queryClient.setQueryData(["blog", "content"], blog);
    setActive(2);
  };

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Title"
        label="Title"
        w="80%"
        value={blog?.title}
        required
        onChange={(e) =>
          setBlog((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <div style={{ width: "80%" }}>
        <RichTextEditorNew
          value={blog?.content}
          onChange={(val) => setBlog((prev) => ({ ...prev, content: val }))}
        />
      </div>
      <TagsInput
        type="text"
        placeholder="Add references"
        label="References"
        description={
          <div className="grid">
            Press enter after each link
            <span className="text-red-600 text-sm">
              *Do not upload any copyrighted images, as they will be taken down
              due to legal repercussions.
            </span>
          </div>
        }
        w="80%"
        value={blog?.references}
        onChange={(values) =>
          setBlog((prev) => ({ ...prev, references: values }))
        }
      />
      <Button radius={999} type="submit" w={"fit-content"}>
        Next
      </Button>
    </form>
  );
}
