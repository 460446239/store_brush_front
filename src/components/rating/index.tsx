import React, { useState } from 'react';

interface StarRatingProps {
    maxStars?: number;
    initialRating?: number;
    onRatingChange?: (rating: number) => void;
    size?: 'small' | 'medium' | 'large';
    readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
    maxStars = 5,
    initialRating = 0,
    onRatingChange,
    size = 'medium',
    readonly = false
}) => {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handleStarClick = (index: number) => {
        if (readonly) return;

        const newRating = index + 1;
        setRating(newRating);

        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    const handleStarHover = (index: number) => {
        if (readonly) return;
        setHoverRating(index + 1);
    };

    const handleMouseLeave = () => {
        if (readonly) return;
        setHoverRating(0);
    };

    const getStarSize = () => {
        switch (size) {
            case 'small': return 'w-4 h-4';
            case 'large': return 'w-12 h-12';
            default: return 'w-8 h-8';
        }
    };

    const renderStar = (index: number) => {
        const isFilled = index < (hoverRating || rating);
        const starClass = `transition-colors duration-150 ${getStarSize()} ${isFilled ? 'text-yellow-400' : 'text-gray-300'
            }`;

        return (
            <svg
                key={index}
                className={starClass}
                fill="currentColor"
                viewBox="0 0 20 20"
                onClick={() => handleStarClick(index)}
                onMouseEnter={() => handleStarHover(index)}
                onMouseLeave={handleMouseLeave}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        );
    };

    return (
        <div className="flex items-center">
            <div className="flex">
                {Array.from({ length: maxStars }).map((_, index) => renderStar(index))}
            </div>
        </div>
    );
};

export default StarRating;