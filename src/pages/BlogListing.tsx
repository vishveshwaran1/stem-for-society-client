import { Badge, Button, Card, Image, Skeleton, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Errorbox from "../components/Errorbox";
import { api } from "../lib/api";
import { GenericError, GenericResponse } from "../lib/types";
import { formatDate } from "../lib/utils";

export type Blog = {
  id: string;
  slug: string;
  references?: string[];
  category: string;
  title: string;
  content: string;
  createdAt: string;
  coverImage: string;
  blogAuthor: {
    name: string;
    linkedin: string;
    designation?: string;
  };
};

function useBlogs() {
  return useQuery<GenericResponse<Blog[]>, AxiosError<GenericError>>({
    queryKey: ["blogs"],
    queryFn: async () => {
      return (await api().get("/blogs")).data;
    },
    staleTime: 1000 * 60 * 300,
  });
}

const BlogListing: React.FC = () => {
  const { data, isPending, error } = useBlogs();

  if (error) {
    // @ts-expect-error - error is of type AxiosError
    return <Errorbox message={error.response?.data.error} />;
  }

  const blogs = isPending ? [] : data.data;

  return (
    <div className="container mx-auto px-4 w-[90%] my-12 grid gap-7">
      <div className="mb-10 space-y-3">
        <h1 className="text-4xl font-semibold mb-4">
          Scientific Communication
        </h1>
        <p className="text-lg text-justify text-pretty text-gray-600">
          Stem for Society invites Scientist, Postdoc, PhD, masters, bachelor
          students and researchers to share their research journey by writing
          blogs about their publication or scientific information aimed at the
          general public and society! By sharing insights and engaging with
          readers, you can foster community connections and encourage meaningful
          discussions around your research.
        </p>
        <p className="text-lg text-justify text-gray-600 mt-4">
          Join us in making your research matter to everyone—let's empower
          society with knowledge and encourage curiosity about the world around
          us! Every month for the best scientific communication and Outstanding
          contributions will be rewarded with prizes and certificates of
          appreciation, recognizing your efforts to make science accessible and
          engaging for all.
        </p>

        <div className="w-full bg-[#228be6]/20 gap-3 flex justify-center rounded-md p-8 items-center flex-col">
          <p className="font-medium">
            Getting your article published typically takes about a day to get
            verified
          </p>
          <Link to={"/blogs/new"}>
            <Button radius={999} classNames={{ label: "text-white" }}>
              Create article
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isPending ? (
            <>
              <Skeleton width={300} height={250} radius={"md"} />
              <Skeleton width={300} height={250} radius={"md"} />
              <Skeleton width={300} height={250} radius={"md"} />
            </>
          ) : (
            blogs.map((blog, index) => (
              <Link
                to={`/blogs/${blog.slug}`}
                className="text-lg text-gray-800 mb-2"
              >
                <Card
                  key={index}
                  shadow="sm"
                  padding="xs"
                  className="bg-gray-100"
                  radius="md"
                >
                  <Card.Section h={"70%"} className="overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      className="aspect-video w-auto"
                      alt="Cover"
                    />
                  </Card.Section>
                  <div className="p-1 flex flex-col gap-1 mt-1">
                    {blog.category && (
                      <Badge color="green" variant="light">
                        {blog.category}
                      </Badge>
                    )}

                    {blog.title}
                    <p className="text-sm">by {blog.blogAuthor.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(blog.createdAt)}
                    </p>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>

        <div className="lg:w-1/4">
          <TextInput
            placeholder="Search blogs..."
            type="search"
            leftSection={<Search size={13} />}
            className="mb-6"
          />

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Blog Categories
            </h3>
            <i className="text-gray-400">No data</i>
            {/* <ul className="space-y-2">
                {[
                  "Physics",
                  "Chemistry",
                  "Biology",
                  "Environmental Science",
                  "Astronomy",
                  "Artificial Intelligence",
                  "Software Development",
                  "Cybersecurity",
                  "Data Science",
                  "Robotics",
                  "Civil Engineering",
                  "Mechanical Engineering",
                ].map((category, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {category}
                  </li>
                ))}
              </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListing;
