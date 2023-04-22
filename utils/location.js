const GOOGLE_API_KEY = require('../config/keys').GOOGLE_API_KEY;

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export const getAddressFromCoords = async (lat, lng) => {
  try {
    const result = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );

    if (!result.ok) {
      throw new Error('Failed to fetch address.');
    }

    const data = await result.json();
    if (data.error_message) {
      throw new Error(data.error_message);
    }

    const address = data.results[0].formatted_address;
    return address;
  } catch (error) {
    console.log('getAddressFromCoords error: ', error);
    return res.json();
  }
};
