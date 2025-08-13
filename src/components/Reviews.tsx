import StarRating from "./StarRating";

const reviews = [
  {
    id: 1,
    title:
      "Cellular Biology and Genetic Engineering with Biotechnological Applications",
    author: "Sakthi LK",
    rating: 4,
    profile: "https://i.pravatar.cc/300?img=54",
    content:
      "An exceptional course that bridges theoretical knowledge with practical insights into cellular biology and genetic engineering. The hands-on projects and case studies helped me understand",
  },
  {
    id: 2,
    title: "Effective Writing Strategy & Successful Journal publication",
    author: "Shiv Shankar",
    rating: 5,
    profile: "https://i.pravatar.cc/300?img=14",
    content:
      "Very useful course in helping me develop good strategies to develop my writing skills",
  },
];

function ReviewCards() {
  return (
    <div className=" py-8 my-24">
      <h2 className="text-2xl font-semibold text-center mb-8">Reviews</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-6 flex flex-col">
            <div className="flex flex-col justify-start rounded-xl h-80 bg-sky-200/70 border-2 border-blue-300 p-3 items-center mb-4">
              <div className="flex">
                <StarRating rating={review.rating} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                {review.title}
              </h3>
              <p className="text-sm text-center text-gray-600 max-h-72 text-ellipsis overflow-hidden">
                {review.content}
              </p>
            </div>
            <div className="flex mb-4 items-center gap-2">
              <img src={review.profile} className="rounded-full w-10" alt="c" />
              <p className="text-sm font-medium text-gray-600 text-center">
                {review.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewCards;
