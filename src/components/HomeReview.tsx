"use client";

import { useState } from "react";
import { submitReview } from "@/app/actions";
import Link from "next/link";

const ALL_EMOJIS = [
    "🤩", "😋", "🤤", "🥰", "😎", "🇺🇦",
    "🥩", "🍖", "🥓", "🔥", "👨‍🍳", "👍",
    "🍔", "🌭", "🍺", "🍷", "🎉", "❤️",
    "🐷", "🐮", "🐔", "🌶️", "🧂", "🏠",
    "🤪", "😇", "🥳", "🤠", "🧐", "😈",
    "🍕", "🌮", "🥗", "🥪", "🍳", "🥖",
    "🧀", "🥟", "🍤", "🍣", "🍦", "🍫"
];

export default function HomeReviews({ reviews }: { reviews: any[] }) {
    const [rating, setRating] = useState(5);
    const [selectedEmoji, setSelectedEmoji] = useState(ALL_EMOJIS[2]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const displayedEmojis = isExpanded ? ALL_EMOJIS : ALL_EMOJIS.slice(0, 12);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        formData.append("rating", rating.toString());
        formData.append("emoji", selectedEmoji);

        const result = await submitReview(formData);
        if (result.success) setIsSubmitted(true);
        setIsLoading(false);
    }

    return (
        <section className="py-15 bg-gray-50 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 right-10 text-5xl transform rotate-12">🥩</div>
                <div className="absolute bottom-20 left-10 text-5xl transform -rotate-12">🥓</div>
            </div>

            <div className="container mx-auto px-4 relative z-10">

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-black uppercase mb-4 tracking-tight">
                        Стіна <span className="text-[#D02020]">Смаку</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-lg">
                        Справжні емоції наших клієнтів. Приєднуйтесь до родини гурманів!
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    <div className="lg:col-span-7 grid gap-6 md:grid-cols-2 auto-rows-min">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all h-full flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-2xl border border-gray-200">
                                            {review.emoji}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 leading-none mb-1">{review.name}</h4>
                                            <div className="flex text-yellow-400 text-sm">
                                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 italic mb-6 flex-grow leading-relaxed font-serif">
                                    "{review.text}"
                                </p>

                                {review.product && (
                                    <div className="pt-4 border-t border-gray-50 mt-auto">
                                        <Link href={`/catalog/${review.product._id}`} className="group flex items-center gap-2 text-sm">
                                            <span className="text-gray-400">Замовив:</span>
                                            <span className="font-bold text-[#D02020] group-hover:underline">
                                                {review.product.title}
                                            </span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                        {reviews.length === 0 && (
                            <div className="col-span-2 text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 font-medium">Тут поки що тихо... Ваш відгук може стати першим!</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5 sticky top-8">
                        <div className="bg-[#121212] rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden text-white">

                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D02020] to-[#A01010]"></div>

                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10 pt-4">

                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">Залишити відгук</h3>

                                        <div className="w-24 h-24 mx-auto bg-[#2A2A2A] rounded-full flex items-center justify-center text-6xl shadow-lg ring-4 ring-[#D02020]/20 animate-pulse-slow">
                                            {selectedEmoji}
                                        </div>
                                        <p className="text-gray-400 text-xs mt-3 uppercase tracking-widest">Ваш настрій</p>
                                    </div>

                                    <div>
                                        <div className="grid grid-cols-6 gap-2 mb-3">
                                            {displayedEmojis.map((emoji) => (
                                                <button
                                                    type="button"
                                                    key={emoji}
                                                    onClick={() => setSelectedEmoji(emoji)}
                                                    className={`aspect-square flex items-center justify-center text-2xl rounded-xl transition-all duration-200 ${selectedEmoji === emoji
                                                            ? "bg-[#D02020] text-white shadow-lg shadow-red-900/50 scale-110 ring-2 ring-[#121212]"
                                                            : "bg-[#2A2A2A] text-white/50 hover:bg-[#333333] hover:text-white hover:scale-105"
                                                        }`}
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="w-full py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors border border-gray-800 rounded-lg hover:border-gray-600"
                                        >
                                            {isExpanded ? "Згорнути ▲" : "Більше емодзі ▼"}
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 text-center">Ваша оцінка</label>
                                        <div className="flex gap-1 justify-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    type="button"
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    className={`text-4xl transition-all duration-200 transform hover:scale-110 focus:outline-none ${star <= rating
                                                            ? "text-yellow-400"
                                                            : "text-gray-700 hover:text-yellow-200"
                                                        }`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <input
                                            name="name"
                                            required
                                            placeholder="Як вас звати?"
                                            className="w-full bg-[#2A2A2A] border border-gray-700 text-white rounded-xl px-5 py-4 focus:border-[#D02020] focus:ring-1 focus:ring-[#D02020] transition-all font-medium placeholder-gray-500 outline-none"
                                        />
                                        <textarea
                                            name="text"
                                            required
                                            placeholder="Ваші смачні враження..."
                                            rows={3}
                                            className="w-full bg-[#2A2A2A] border border-gray-700 text-white rounded-xl px-5 py-4 focus:border-[#D02020] focus:ring-1 focus:ring-[#D02020] transition-all font-medium placeholder-gray-500 outline-none resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-[#D02020] to-[#B01010] hover:from-[#E03030] hover:to-[#C02020] text-white font-bold py-5 rounded-xl shadow-md transform hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                                    >
                                        {isLoading ? "Відправка..." : "Опублікувати відгук"}
                                    </button>

                                </form>
                            ) : (
                                <div className="text-center py-32 animate-fade-in">
                                    <div className="w-20 h-20 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 border-2 border-green-900/50">
                                        ✓
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">Дякуємо!</h3>
                                    <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                                        Ваш відгук отримано і відправлено на модерацію.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-white bg-[#2A2A2A] hover:bg-[#333333] px-6 py-3 rounded-full text-sm font-bold transition"
                                    >
                                        Написати ще один
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}