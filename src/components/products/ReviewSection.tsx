// src/components/products/ReviewSection.tsx
"use client";
import { createClientReview } from "@/actions/product.actions";
import { getUserById } from "@/actions/user.actions";
import { ClientReview } from "@/types/ClientReview";
import { User } from "@/types/User";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface ReviewSectionProps {
  reviews: ClientReview[];
  averageRating: number;
  productId: string;
}

export default function ReviewSection({
  reviews,
  averageRating,
  productId,
}: ReviewSectionProps) {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });
  const [users, setUsers] = useState<Record<string, User>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData: Record<string, User> = {};
      for (const review of reviews) {
        if (!usersData[review.userId]) {
          const user = await getUserById(review.userId);
          if (user) {
            usersData[review.userId] = user;
          }
        }
      }
      setUsers(usersData);
    };
    fetchUsers();
  }, [reviews]);

  const renderRatingStars = (rating: number, size = "w-4 h-4") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className={`${size} fill-accent text-accent`} />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Star key={i} className={`${size} fill-accent/50 text-accent`} />
        );
      } else {
        stars.push(<Star key={i} className={`${size} text-secondary`} />);
      }
    }
    return stars;
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log({
        productId,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      await createClientReview(productId, newReview.rating, newReview.comment);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    setIsWritingReview(false);
    setNewReview({ rating: 5, comment: "" });
  };

  return (
    <div className="mt-12 bg-white rounded-xl shadow-soft p-8 border border-secondary-light">
      <h2 className="text-2xl font-bold text-primary-dark font-serif mb-8">
        Customer Reviews
      </h2>

      {reviews.length > 0 ? (
        <>
          {/* Rating Summary */}
          <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-dark mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderRatingStars(averageRating, "w-5 h-5")}
              </div>
              <div className="text-neutral-dark">
                Based on {reviews.length} review
                {reviews.length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 w-full">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(
                  (r) => Math.floor(r.rating) === star
                ).length;
                const percentage = (count / reviews.length) * 100;

                return (
                  <div key={star} className="flex items-center mb-2">
                    <div className="w-10 text-neutral-dark">{star} star</div>
                    <div className="flex-1 mx-2 h-2 bg-secondary-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-10 text-right text-neutral-dark">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border-b border-secondary-light pb-6 last:border-0"
              >
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {renderRatingStars(review.rating)}
                  </div>
                  <span className="text-neutral text-sm">
                    {new Date(review.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h4 className="font-medium text-primary-dark mb-1">
                  {users[review.userId]?.firstName +
                    " " +
                    users[review.userId]?.lastName ||
                    `User ${review.userId.substring(0, 4)}`}
                </h4>
                <p className="text-neutral-dark">{review.comment}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-neutral">
          <p className="text-lg mb-4">No reviews yet.</p>
          <p>Be the first to review this product!</p>
        </div>
      )}

      {/* Add Review Section */}
      {!isWritingReview ? (
        <button
          onClick={() => setIsWritingReview(true)}
          className="mt-8 bg-accent hover:bg-accent-dark text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm hover:shadow-hover"
        >
          Write a Review
        </button>
      ) : (
        <form onSubmit={handleReviewSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-neutral-dark mb-2">Your Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="mr-1"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= newReview.rating
                        ? "fill-accent text-accent"
                        : "text-secondary"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="review" className="block text-neutral-dark mb-2">
              Your Review
            </label>
            <textarea
              id="review"
              rows={4}
              className="w-full border border-secondary rounded-lg p-3 focus:ring-accent focus:border-accent"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-accent hover:bg-accent-dark text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm hover:shadow-hover"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setIsWritingReview(false)}
              className="border border-secondary hover:bg-secondary-light font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
