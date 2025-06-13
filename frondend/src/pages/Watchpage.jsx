import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import ReactPlayer from "react-player";
import { formatReleaseDate } from "../utils/dateFunction";


const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null); // Initially null, to handle errors
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);

  useEffect(() => {
	window.scrollTo(0, 0); // Ensures the page scrolls to the top on load
  }, []);

  	// Fetch trailers
  	useEffect(() => {
		const getTrailers = async () => {
	  		try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
				console.log('API response:', res.data);  // Log the response to check the structure
				if (res.data.success && Array.isArray(res.data.content)) {
					setTrailers(res.data.content);  // Set trailers correctly
				} else {
					setTrailers([]);  // In case the response doesn't contain trailers
				}
			} catch (error) {
				console.error('Error fetching trailers:', error);
				setTrailers([]);  // Set empty trailers array in case of error
			}
		};
		getTrailers();
 	}, [contentType, id]);
  

  	// Fetch similar content
	useEffect(() => {
		const getSimilarContent = async () => {
	  		try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
				console.log("Similar Content Response: ", res.data); // Log the response for debugging
				if (res.data.success && Array.isArray(res.data.content)) {
		  			setSimilarContent(res.data.content); // Ensure content is always an array
				} else {
					setSimilarContent([]); // Set empty array if no similar content
				}
				} catch (error) {
					console.error("Error fetching similar content:", error);
					setSimilarContent([]); // Default to empty array in case of error
				}
			};  
		getSimilarContent();
  	}, [contentType, id]);
  

  	// Fetch content details
	useEffect(() => {
		const getContentDetails = async () => {
	  		try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
				console.log("Content Details Response: ", res.data); // Log the response for debugging
				if (res.data.success && res.data.content) {
		 			 setContent(res.data.content); // Ensure content is set properly
				} else {
		  			setContent(null); // Set content to null if no content found
				}
	 		} catch (error) {
				console.error("Error fetching content details:", error);
				setContent(null); // Set content to null if error occurs
	  		} finally {
				setLoading(false); // Stop loading once data is fetched or error is caught
	  		}
		};  
		getContentDetails();
  	}, [contentType, id]);
  

	console.log('trailers', trailers)
	console.log('similarContent', similarContent);
	console.log('content', content)

	// Handle trailer navigation
	const handleNext = () => {
		if (currentTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailerIdx + 1);
	};
	const handlePrev = () => {
		if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
	};

	// Scroll handlers for similar content carousel
	const scrollLeft = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
	};
	const scrollRight = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	// Loading State - return loading skeleton
	if (loading) {
		return (
		<div className="min-h-screen bg-black p-10">
			<WatchPageSkeleton />
		</div>
		);
	}

	// If content is not found
	if (!content) {
		return (
		<div className="bg-black text-white h-screen">
			<div className="max-w-6xl mx-auto">
			<Navbar />
			<div className="text-center mx-auto px-4 py-8 h-full mt-40">
				<h2 className="text-2xl sm:text-5xl font-bold text-balance">Content not found 😥</h2>
			</div>
			</div>
		</div>
		);
	}

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {/* Trailer navigation */}
        {Array.isArray(trailers) && trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Video player */}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {/* No trailers available */}
          {Array.isArray(trailers) && trailers.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">{content?.title || content?.name}</span> 😥
            </h2>
          )}
        </div>

        {/* Movie details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">{content?.title || content?.name}</h2>
            <p className="mt-2 text-lg">
			{formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {/* Similar content */}
        {Array.isArray(similarContent) && similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/TV Shows</h3>

            <div className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group" ref={sliderRef}>
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link key={content.id} to={`/watch/${content.id}`} className="w-52 flex-none">
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">{content.title || content.name}</h4>
                  </Link>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 
                transition-all duration-300 cursor-pointer rounded-full hover:border-2 border-white bg-black bg-opacity-50 
                hover:bg-opacity-75 text-white z-10"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 
                transition-all duration-300 cursor-pointer rounded-full hover:border-2 border-white bg-black bg-opacity-50 
                hover:bg-opacity-75 text-white z-10"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
