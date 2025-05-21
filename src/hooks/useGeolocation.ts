import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('이 브라우저는 지오로케이션을 지원하지 않습니다.');
      return;
    }

    navigator.permissions
      ?.query({ name: 'geolocation' })
      .then((status) => {
        console.log('Permission state:', status.state);
        if (status.state !== 'denied') {
          navigator.geolocation.getCurrentPosition(
            successHandler,
            errorHandler
          );
        }
      })
      .catch(() => {
        // permissions API 미지원 브라우저
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
      });
  }, []);

  const successHandler = (response: {
    coords: { latitude: number; longitude: number };
  }) => {
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error: GeolocationPositionError) => {
    console.error('geo error:', error.code, error.message);
  };

  return { location };
};

export default useGeolocation;
