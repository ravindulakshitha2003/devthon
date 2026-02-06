import React from 'react';

const ImageCard = ({message}) => {
    // Check if trip data exists

    const { day, city, places } = message;

    return (
        <div className='card-container'>
            <div className='image-container'>
                <img 
                    src='https://tse3.mm.bing.net/th/id/OIP.U_VJuupQohwnzXcKMztqWgHaEo?rs=1&pid=ImgDetMain&o=7&rm=3' 
                    alt='uploaded images'
                />
            </div>
            <div className='content-container'>
                <h3>Day {day}: {city}</h3>
                <div className='places-list'>
                    {places && places.map((place, index) => (
                        <div key={index} className='place-item'>
                            <p><strong>{place.name}</strong></p>
                            {place.type && <p className='place-type'>{place.type}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageCard;