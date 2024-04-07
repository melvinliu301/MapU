import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const googleLocationInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Enter Location'
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyDC2rRSOkfPwtB53kvnyLHrE4mHAwLKIS0',
        language: 'en',
      }}
    />
  );
};

export default LocationInput;