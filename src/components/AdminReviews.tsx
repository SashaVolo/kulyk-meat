"use client";

import { useState, useEffect } from "react";
import { getAllReviewsForAdmin, toggleReviewStatus, deleteReview } from "@/app/actions";

export default function AdminReviews() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadReviews();
    }, []);

    async function loadReviews() {
        setIsLoading(true);
        const data = await getAllReviewsForAdmin();
        setReviews(data);
        setIsLoading(false);
    }

    async function handleToggle(id: string, currentStatus: boolean) {
        setReviews(prev => prev.map(r =>
            r._id === id ? { ...r, isApproved: !currentStatus } : r
        ));

        await toggleReviewStatus(id, currentStatus);
    }


    async function handleDelete(id: string) {
        if (!confirm("Ви точно хочете видалити цей відгук?")) return;

        setReviews(prev => prev.filter(r => r._id !== id));
        await deleteReview(id);
    }

    if (isLoading) return <div className="p-8 text-center text-gray-500">Завантаження відгуків...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Управління відгуками ({reviews.length})</h2>
                <button onClick={loadReviews} className="text-blue-600 hover:underline text-sm">🔄 Оновити</button>
            </div>

            <div className="grid gap-4">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className={`p-4 rounded-lg border-2 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-colors ${review.isApproved
                                ? "bg-white border-gray-100"
                                : "bg-yellow-50 border-yellow-200"
                            }`}
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">{review.emoji}</span>
                                <span className="font-bold">{review.name}</span>
                                <span className="text-yellow-500 text-sm">
                                    {"★".repeat(review.rating)}
                                </span>
                                {!review.isApproved && (
                                    <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold uppercase">
                                        На модерації
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-700 mb-2">"{review.text}"</p>

                            {review.product ? (
                                <div className="text-xs text-gray-500">
                                    Товар: <span className="text-[#D02020] font-medium">{review.product.title}</span>
                                </div>
                            ) : (
                                <div className="text-xs text-gray-400">Загальний відгук</div>
                            )}

                            <div className="text-xs text-gray-300 mt-1">
                                {new Date(review._createdAt).toLocaleString('uk-UA')}
                            </div>
                        </div>

                        {/* Кнопки дій */}
                        <div className="flex gap-2 w-full md:w-auto">
                            <button
                                onClick={() => handleToggle(review._id, review.isApproved)}
                                className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-bold text-sm text-white transition ${review.isApproved
                                        ? "bg-gray-400 hover:bg-gray-500"
                                        : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {review.isApproved ? "Сховати 🙈" : "Опублікувати ✅"}
                            </button>

                            <button
                                onClick={() => handleDelete(review._id)}
                                className="px-4 py-2 rounded-lg font-bold text-sm text-white bg-red-100 text-red-600 hover:bg-red-200"
                            >
                                🗑
                            </button>
                        </div>
                    </div>
                ))}

                {reviews.length === 0 && (
                    <p className="text-center text-gray-400 py-10">Відгуків поки немає</p>
                )}
            </div>
        </div>
    );
}