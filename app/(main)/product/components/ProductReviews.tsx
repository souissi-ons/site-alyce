"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { Review } from "@/types";

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  reviewsNumber: number;
  productId: string;
}

export default function ProductReviews({
  reviews,
  averageRating,
  reviewsNumber,
  productId,
}: ProductReviewsProps) {
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  const handleRateProduct = async (rating: number) => {
    setIsSubmittingRating(true);
    try {
      //Add rating to the product
    } catch (error) {
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return;

    setIsSubmittingComment(true);
    try {
      // Add comment to the product
    } catch (error) {
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-gray-800">
        Commentaires ({reviewsNumber})
      </h1>

      <div className="flex flex-col md:flex-row justify-between p-6 gap-4">
        <div className="md:w-1/2 p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center">
          <h1 className="text-xl font-bold">Moyenne</h1>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < Math.floor(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="mt-2 text-2xl font-semibold text-gray-700">
            {averageRating}
          </span>
        </div>

        <div className="md:w-1/2 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center text-lg font-bold mb-4">
            Détails des notes
          </h2>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count =
                reviews?.filter((r) => r.rating === star).length || 0;
              const percentage =
                reviewsNumber > 0 ? (count / reviewsNumber) * 100 : 0;

              return (
                <div key={star} className="flex items-center">
                  <span className="w-8">{star}★</span>
                  <div className="flex-1 mx-2 h-4 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-tertiaryLight rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="p-4 bg-white rounded-lg shadow space-y-4">
            {/* Notation seule */}
            <div>
              <h3 className="font-semibold mb-2">Noter ce produit</h3>
              <div className="flex items-center">
                <div className="flex mr-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRateProduct(star)}
                      className="focus:outline-none"
                      disabled={isSubmittingRating}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= userRating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        } ${isSubmittingRating ? "opacity-50" : ""}`}
                      />
                    </button>
                  ))}
                </div>
                {isSubmittingRating && (
                  <svg
                    className="animate-spin h-5 w-5 text-primaryDark"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </div>
            </div>

            {/* Commentaire seul */}
            <div>
              <h3 className="font-semibold mb-2">Ajouter un commentaire</h3>
              <textarea
                placeholder="Votre avis sur ce produit..."
                className="w-full p-2 border rounded-lg outline-none min-h-[100px]"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-tertiaryLight text-white py-2 rounded-lg hover:bg-primaryDark disabled:bg-gray-400 flex items-center justify-center"
                onClick={handleAddComment}
                disabled={isSubmittingComment || !newComment}
              >
                {isSubmittingComment ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  "Publier le commentaire"
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 space-y-4">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-tertiaryLight rounded-full flex items-center justify-center text-white font-semibold">
                    {/* {review.userId?.name?.charAt(0) || "A"} */}
                    {"A"}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-semibold text-gray-800">
                        {/* {review.userId?.name || "Anonyme"} */}
                        {review.userId || "Anonyme"}
                      </p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Aucun avis pour ce produit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
