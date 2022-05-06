import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const UserLocation = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  console.log(x);
  console.log(y);
  useEffect(() => {
    const getLocation = () => {
      let lat: number, long: number;

      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            setX(long);
            setY(lat);
          },
          function (error) {
            Swal.fire({
              title: error.message,
              text: 'A:PATY 서비스 이용을 위해서는 거주 위치 인증이 필요합니다. GPS 이용을 허용해주세요.',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000,
            });
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          },
        );
      } else {
        Swal.fire({
          title: '이 브라우저는 GPS를 지원하지 않습니다',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
    };

    getLocation();
  }, []);
  return { x, y };
};

export default UserLocation;
