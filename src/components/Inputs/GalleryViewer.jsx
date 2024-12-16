import { useState } from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { api } from "../../utilities";

// Set the app element for accessibility
Modal.setAppElement("#root");

const GalleryViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]); // This will store the fetched images
  const [loading, setLoading] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const baseUrl = "https://your-api-domain.com"; // Set your server's base URL here

  // // Function to handle image URL if it is relative
  // const handleImageUrl = (url) => {
  //   // Check if the URL is absolute or relative
  //   if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
  //     // Prepend the base URL if it's a relative URL
  //     return `${baseUrl}${url}`;
  //   }
  //   return url; // If it's already a full URL, return as is
  // };

  // Fetch images from the API
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await api.get("schedule/images/41"); // Adjust API route as needed
      if (response && response.data && response.data.data) {
        // Process images to handle relative URLs
        const imagesWithUrls = response.data.data.map((image) => ({
          ...image,
          ImageUrl: image.ImageUrl, // Process each image's URL
        }));
        setImages(imagesWithUrls);
      }
      console.log(response); // Log the response for debugging
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  // Open the gallery modal and fetch images
  const openPopup = () => {
    setIsOpen(true);
    fetchImages();
  };

  // Close the gallery modal
  const closePopup = () => setIsOpen(false);

  // Open the carousel with the selected image index
  const openCarousel = (index) => {
    setCurrentIndex(index);
    setIsCarouselOpen(true);
  };

  // Close the carousel modal
  const closeCarousel = () => setIsCarouselOpen(false);

  // Carousel settings
  const carouselSettings = {
    initialSlide: currentIndex,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
      {/* Button to open the gallery */}
      <button
        onClick={openPopup}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        Open Gallery
      </button>

      {/* Modal Popup for Gallery */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-60"
      >
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Image Gallery
            </h2>
            <button
              onClick={closePopup}
              className="text-gray-400 hover:text-gray-600 transition duration-300"
            >
              ✖
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {loading ? (
              <div className="text-center py-10">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={image.ImageID} // Ensure you're using a unique key, such as ImageID
                    className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
                    onClick={() => openCarousel(index)}
                  >
                    <img
                      src={image.ImageUrl}
                      alt={image.Image_description}
                      className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white text-sm font-medium">
                        {image.Image_description || "No description"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Carousel Modal */}
      <Modal
        isOpen={isCarouselOpen}
        onRequestClose={closeCarousel}
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-60"
      >
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 overflow-hidden">
          <Slider {...carouselSettings}>
            {images.map((image, index) => (
              <div key={image.ImageID} className="flex justify-center">
                <img
                  src={image.ImageUrl} // Use the correct URL field
                  alt={image.Image_description}
                  className="max-h-[80vh] object-contain"
                />
              </div>
            ))}
          </Slider>
          <button
            onClick={closeCarousel}
            className="absolute top-4 right-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-full shadow-lg hover:bg-gray-300 transition"
          >
            ✖ Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryViewer;
