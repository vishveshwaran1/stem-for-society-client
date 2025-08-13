import { Avatar, Button, Flex, Image, Text, Title } from "@mantine/core";
import BlogContent from "../components/BlogContent";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { api } from "../lib/api";
import { GenericError, GenericResponse } from "../lib/types";
import { Blog } from "./BlogListing";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Errorbox from "../components/Errorbox";
import { formatDate } from "../lib/utils";

function useBlog(slug: string) {
  return useQuery<GenericResponse<Blog>, AxiosError<GenericError>>({
    queryKey: ["blogs", slug],
    queryFn: async () => {
      return (await api().get(`/blogs/${slug}`)).data;
    },
    staleTime: 1000 * 60 * 300,
  });
}

function BlogSpotlight() {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate(-1);
  }
  const { data, isPending, error } = useBlog(id!);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    // @ts-expect-error - error is of type AxiosError
    return <Errorbox message={error.response?.data.error} />;
  }

  const blog = data?.data;

  return (
    <div className="w-full mt-4 max-w-7xl mx-auto flex flex-col">
      {/*// @ts-expect-error shutup */}
      <Link to={-1}>
        <Button radius={999}>
          <ChevronLeft size={16} />
          Back
        </Button>
      </Link>
      {!blog ? (
        <Title mt={20}>Invalid blog!</Title>
      ) : (
        <>
          <Title mt={20}>{blog.title}</Title>
          <Flex
            mt={15}
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Avatar size="sm" color="cyan" radius="xl">
              {blog.blogAuthor.name
                .split(" ")
                .map((x) => x[0].toUpperCase())
                .join("")}
            </Avatar>
            <Text size="sm" display={"flex"} className="items-center gap-3">
              <div className="grid">
                <span className="text-base">{blog.blogAuthor.name}</span>
                <span className="text-gray-400">
                  {blog.blogAuthor.designation}
                </span>
              </div>{" "}
              • {formatDate(blog.createdAt)}
            </Text>
          </Flex>
          <Flex
            gap={10}
            mt={20}
            className="content"
            justify="center"
            align="center"
            direction="column"
          >
            <Image
              radius="md"
              h={300}
              w={700}
              fit="contain"
              src={blog.coverImage}
            />
            <BlogContent markdownContent={blog.content}></BlogContent>
          </Flex>
        </>
      )}
    </div>
  );
}

export default BlogSpotlight;
