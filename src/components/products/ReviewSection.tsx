// src/components/products/ReviewSection.tsx
"use client";
// Import the review action - Make sure this points to the correct file
import { getUserById } from "@/actions/user.actions";
import { isLoggedIn as checkIsLoggedIn } from "@/actions/auth.actions";
import { ClientReview } from "@/types/ClientReview";
import { User } from "@/types/User";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });
  const [users, setUsers] = useState<Record<string, User>>({});
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData: Record<string, User> = {};
      for (const review of reviews) {
        if (!usersData[review.userId]) {
          try {
            const user = await getUserById(review.userId);
            if (user) {
              usersData[review.userId] = user;
            }
          } catch (error) {
            console.error(`Error fetching user ${review.userId}:`, error);
          }
        }
      }
      setUsers(usersData);
    };

    if (reviews.length > 0) {
      fetchUsers();
    }
  }, [reviews]);

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté (côté client)
    (async () => {
      try {
        const logged = await checkIsLoggedIn();
        setIsLoggedIn(logged);
      } catch {
        setIsLoggedIn(false);
      }
    })();
  }, []);

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

  const validateForm = () => {
    const trimmedComment = newReview.comment.trim();

    if (!trimmedComment) {
      setSubmitMessage({
        type: "error",
        text: "Please enter a comment for your review.",
      });
      return false;
    }

    if (trimmedComment.length > 500) {
      setSubmitMessage({
        type: "error",
        text: "Comment must be 500 characters or less.",
      });
      return false;
    }

    if (newReview.rating < 1 || newReview.rating > 5) {
      setSubmitMessage({
        type: "error",
        text: "Please select a rating between 1 and 5 stars.",
      });
      return false;
    }

    return true;
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Appel direct à ton backend NestJS
      await axios.post(
        "http://localhost:5000/client-review?product_id=" + productId,
        {
          rating: newReview.rating,
          comment: newReview.comment.trim(),
        },
        {
          // Ajoute les credentials ou headers d'auth si besoin
          withCredentials: true,
        }
      );

      setSubmitMessage({
        type: "success",
        text: "Review submitted successfully! Thank you for your feedback.",
      });

      setIsWritingReview(false);
      setNewReview({ rating: 5, comment: "" });

      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (error: any) {
      setSubmitMessage({
        type: "error",
        text:
          error.message || "An error occurred while submitting your review.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelReview = () => {
    setIsWritingReview(false);
    setNewReview({ rating: 5, comment: "" });
    setSubmitMessage(null);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Clear error message when user starts typing
    if (submitMessage?.type === "error") {
      setSubmitMessage(null);
    }

    setNewReview({ ...newReview, comment: value });
  };

  return (
    <div className="mt-12 bg-white rounded-xl shadow-soft p-8 border border-secondary-light">
      <h2 className="text-2xl font-bold text-primary-dark font-serif mb-8">
        Customer Reviews
      </h2>

      {/* Success/Error Messages */}
      {submitMessage && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitMessage.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

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
                const percentage =
                  reviews.length > 0 ? (count / reviews.length) * 100 : 0;

                return (
                  <div key={star} className="flex items-center mb-2">
                    <div className="w-10 text-neutral-dark">{star} star</div>
                    <div className="flex-1 mx-2 h-2 bg-secondary-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
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
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
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
                </div>
                <h4 className="font-medium text-primary-dark mb-1">
                  {users[review.userId]
                    ? `${users[review.userId].firstName} ${
                        users[review.userId].lastName
                      }`
                    : `User ${review.userId.substring(0, 4)}`}
                </h4>
                <p className="text-neutral-dark leading-relaxed">
                  {review.comment}
                </p>
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
        isLoggedIn && (
          <button
            onClick={() => {
              setIsWritingReview(true);
              setSubmitMessage(null);
            }}
            className="mt-8 bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Write a Review
          </button>
        )
      ) : (
        <form onSubmit={handleReviewSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-neutral-dark font-medium mb-3">
              Your Rating *
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setNewReview({ ...newReview, rating: star });
                    // Clear error message when user selects rating
                    if (submitMessage?.type === "error") {
                      setSubmitMessage(null);
                    }
                  }}
                  className="mr-1 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 rounded"
                  disabled={isSubmitting}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= newReview.rating
                        ? "fill-accent text-accent"
                        : "text-secondary hover:text-accent/50"
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-2 text-neutral-dark">
                {newReview.rating} star{newReview.rating !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="review"
              className="block text-neutral-dark font-medium mb-3"
            >
              Your Review *
            </label>
            <textarea
              id="review"
              rows={4}
              className="w-full border border-secondary rounded-lg p-4 focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-vertical min-h-[100px]"
              value={newReview.comment}
              onChange={handleCommentChange}
              placeholder="Share your experience with this product..."
              required
              disabled={isSubmitting}
              maxLength={500}
            />
            <div
              className={`text-right text-sm mt-1 ${
                newReview.comment.length > 450
                  ? newReview.comment.length > 500
                    ? "text-red-600"
                    : "text-orange-600"
                  : "text-neutral"
              }`}
            >
              {newReview.comment.length}/500
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !newReview.comment.trim() ||
                newReview.comment.length > 500
              }
              className="bg-accent hover:bg-accent-dark disabled:bg-neutral disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={handleCancelReview}
              disabled={isSubmitting}
              className="border border-secondary hover:bg-secondary-light disabled:opacity-50 disabled:cursor-not-allowed font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
