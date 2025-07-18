import { useState, useEffect } from "react";

export default function AmenitiesItem({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (images.length > 0) {
            setSelectedImage(images[0]);
        } else {
            setSelectedImage(null);
        }
    }, [images]);

    if (!images || images.length === 0) {
        return <p style={{ textAlign: "center" }}>Моля, изберете категория, за да видите снимките.</p>;
    }

    return (
        <div className="galleryWrapper">
            <div className="thumbnailContainer">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`thumbnail-${index}`}
                        onClick={() => setSelectedImage(img)}
                        className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                    />
                ))}
            </div>

            <div className="mainImageContainer">
                {selectedImage && (
                    <img
                        src={selectedImage}
                        alt="main-preview"
                        className="mainImage"
                    />
                )}
            </div>
        </div>
    );
}
