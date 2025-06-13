import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
	const { contentType } = useContentStore();
	const [content, setContent] = useState([]);
	const [showArrows, setShowArrows] = useState(false);
	const sliderRef = useRef(null);

	const formattedCategoryName =
		category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
	const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

	useEffect(() => {
		const getContent = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${category}`);
				setContent(res.data.content || []);
			} catch (error) {
				console.error("Error fetching content:", error);
			}
		};
		getContent();
	}, [contentType, category]);

	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};

	// Filter out movies with no poster
	const filteredContent = content.filter((item) => item.poster_path);

	// Hide section if there's no valid content
	if (filteredContent.length === 0) return null;

	return (
		<div
			className='bg-black text-white relative px-5 md:px-20'
			onMouseEnter={() => setShowArrows(true)}
			onMouseLeave={() => setShowArrows(false)}
		>
			<h2 className='mb-4 text-2xl font-bold'>
				{formattedCategoryName} {formattedContentType}
			</h2>

			<div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
				{filteredContent.map((item) => (
					<Link to={`/watch/${item.id}`} className='min-w-[160px] relative group' key={item.id}>
						<div className='w-40 h-40 bg-gray-800 rounded-lg overflow-hidden'>
							<img
								src={SMALL_IMG_BASE_URL + item.poster_path}
								alt={item.title || item.name}
								className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
							/>
						</div>
						<p className='mt-2 text-center text-sm'>{item.title || item.name}</p>
					</Link>
				))}
			</div>

			{showArrows && (
				<>
					<button
						className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center 
                        size-12 rounded-full hover:border-2 border-white bg-black bg-opacity-50 hover:bg-opacity-75
						 text-white z-10'
						onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
                        size-12 rounded-full hover:border-2 border-white bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
						onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}
		</div>
	);
};

export default MovieSlider;
