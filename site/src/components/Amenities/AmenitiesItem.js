import { useState } from "react";

export default function AmenitiesItem({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const current = images.includes(selectedImage) ? selectedImage : images[0];
    if (!images.length) return <p className="page-state">Моля, изберете категория, за да видите снимките.</p>;
    return (
        <div className="galleryWrapper">
            <div className="thumbnailContainer" aria-label="Снимки в галерията">
                {images.map((img, index) => (
                    <button key={img} type="button" className={`gallery-thumb ${current === img ? 'is-active' : ''}`} aria-label={`Покажи снимка ${index + 1}`} aria-pressed={current === img} onClick={() => setSelectedImage(img)}>
                        <img src={img} alt="" loading="lazy" className="thumbnail" />
                    </button>
                ))}
            </div>
            <div className="mainImageContainer"><img src={current} alt={`Снимка ${images.indexOf(current) + 1} от галерията на Тодорини къщи`} className="mainImage" /></div>
        </div>
    );
}
