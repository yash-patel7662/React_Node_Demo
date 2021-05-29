import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

const images = [
    {
        url: "https://picsum.photos/1350/504"
    },
    {
        url: "https://picsum.photos/id/237/1350/504"
    },
    {
        url: "https://picsum.photos/seed/picsum/1350/504"
    },
    {
        url: "https://picsum.photos/1350/504?grayscale"
    },
    {
        url: "https://picsum.photos/id/870/1350/504?grayscale&blur=2"
    }
];

const Slider = () => {
    return (
        <>
            <div>
                <SimpleImageSlider
                    width={1350}
                    height={504}
                    images={images}
                />
            </div>
        </>
    )
}

export default Slider;