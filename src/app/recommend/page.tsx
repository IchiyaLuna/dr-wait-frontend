'use client';
// React
import React, { useEffect, useRef, useState } from 'react';
// Hooks
import useGeolocation from '@/hooks/useGeolocation';
// Components
import TopBar from '@/components/TopBar';
import TabBar from '@/components/TabBar';
// Types
import { SearchResult } from '@/types/kakao/maps/search';
// Styles
import styles from './page.module.scss';
// Page
export default function RecommendPage() {
  // Hooks
  const { location } = useGeolocation();
  // Refs
  const mapEl = useRef<HTMLDivElement>(null);
  // States
  const [map, setMap] = useState<kakao.maps.Map | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  // Current Geolocation updater
  useEffect(() => {
    if (!location) return;
    setCurrentLocation(location);
  }, [location]);
  // Map builder
  useEffect(() => {
    const { kakao } = window;
    if (!kakao) return;
    // Load map
    kakao.maps.load(() => {
      if (!mapEl.current) return;
      const center = new kakao.maps.LatLng(33.450701, 126.570667);
      const options = {
        center,
        level: 3,
      };
      // Set map on element
      setMap(new kakao.maps.Map(mapEl.current!, options));
    });
  }, []);
  // Current location updater
  useEffect(() => {
    if (!map) return;
    if (!currentLocation) return;
    // Current location
    const currentLatLng = new kakao.maps.LatLng(
      currentLocation.latitude,
      currentLocation.longitude
    );
    // Set marker data
    const currentMarker = new kakao.maps.MarkerImage(
      '/current-location.svg',
      new kakao.maps.Size(28, 28),
      { offset: new kakao.maps.Point(14, 14) }
    );
    // Make marker
    const marker = new kakao.maps.Marker({
      position: currentLatLng,
      image: currentMarker,
    });
    // Set marker on map
    marker.setMap(map);
    // Move map to current location
    map.setCenter(currentLatLng);
  }, [map, currentLocation]);

  useEffect(() => {
    if (!map) return;
    if (!keyword.length) return;
    const ps = new kakao.maps.services.Places(map);

    ps.keywordSearch(keyword, placesSearchCB, {
      useMapCenter: true,
      radius: 250,
    });

    function placesSearchCB(
      data: SearchResult[],
      status: kakao.maps.services.Status,
      pagination: kakao.maps.services.Pagination
    ) {
      if (!map) return;
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          console.log(data[i]);
          console.log(pagination);
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      if (!map) return;
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    }
  }, [map, keyword]);

  return (
    <>
      <TopBar />
      <main className={styles.main}>
        <div ref={mapEl} className={styles.map}></div>
        <div className={styles.panel}>
          <span>할일 추천</span>
          <button onClick={() => setKeyword('공원')}>공원</button>
          <button onClick={() => setKeyword('편의점')}>편의점</button>
          <button onClick={() => setKeyword('빵')}>빵집</button>
          <button onClick={() => setKeyword('서점')}>서점</button>
          <button onClick={() => setKeyword('드럭스토어')}>드럭스토어</button>
          <button onClick={() => setKeyword('생활용품')}>생활용품점</button>
          <button onClick={() => setKeyword('카페')}>카페</button>
          <button onClick={() => setKeyword('은행')}>은행</button>
          <button onClick={() => setKeyword('패트스푸드')}>패트스푸드</button>
          <button onClick={() => setKeyword('죽')}>죽집</button>
        </div>
      </main>
      <TabBar />
    </>
  );
}
