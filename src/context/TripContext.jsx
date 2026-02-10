import React, { createContext, useContext, useState, useCallback } from 'react';

const TripContext = createContext();

const UNSPLASH_CLIENT_ID = '7IumigsVYsLtzTgrTULz0clj5Yv_YlYE1xydk48TaUM';

async function fetchImageForPlace(placeName) {
  if (!placeName) return null;
  const q = encodeURIComponent(`${placeName} Sri Lanka`);
  const url = `https://api.unsplash.com/search/photos?query=${q}&per_page=5&client_id=${UNSPLASH_CLIENT_ID}`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const json = await resp.json();
    if (json && Array.isArray(json.results) && json.results.length > 0) {
      // Prefer regular, fallback to small/thumb
      const first = json.results[0];
      return first.urls?.regular || first.urls?.small || first.urls?.thumb || null;
    }
    return null;
  } catch (e) {
    console.error('Unsplash fetch error for', placeName, e);
    return null;
  }
}

export const TripProvider = ({ children }) => {
  const [tripData, setTripDataState] = useState(null);

  // Public setter: accepts any incoming data shape and augments places/items with images when possible
  const setTripData = useCallback(async (incoming) => {
    if (!incoming) {
      setTripDataState(incoming);
      return;
    }

    // Helper to augment an array of place-like objects
    const augmentPlaces = async (arr) => {
      return await Promise.all(arr.map(async (item) => {
        // determine place name from common keys
        const placeName = item?.placeName || item?.name || item?.title || item?.label || item?.place || '';
        if (item?.image || item?.imageUrl || item?.photo) return { ...item };
        const image = await fetchImageForPlace(placeName);
        return { ...item, image: image || item?.image || '' };
      }));
    };

    // If incoming is an array, assume it's a list of places
    if (Array.isArray(incoming)) {
      const augmented = await augmentPlaces(incoming);
      setTripDataState(augmented);
      return;
    }

    // If incoming has a `trip` array, augment it
    if (incoming && Array.isArray(incoming.trip)) {
      const augmentedTrip = await augmentPlaces(incoming.trip);
      setTripDataState({ ...incoming, trip: augmentedTrip });
      return;
    }

    // If incoming looks like a trip plan with activities -> augment activity items
    if (incoming && Array.isArray(incoming.activities)) {
      const activities = await Promise.all(incoming.activities.map(async (act) => {
        if (!act?.items || !Array.isArray(act.items)) return act;
        const items = await augmentPlaces(act.items);
        return { ...act, items };
      }));
      setTripDataState({ ...incoming, activities });
      return;
    }

    // Fallback: store raw
    setTripDataState(incoming);
  }, []);

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within TripProvider');
  }
  return context;
};
