'use client';
// React
import React, { useEffect, useRef, useState } from 'react';
// Hooks
import useGeolocation from '@/hooks/useGeolocation';
// Components
import TopBar from '@/components/TopBar';
import TabBar from '@/components/TabBar';
// Types
import { KeywordResult, SearchResult } from '@/types/kakao/maps/search';
// Styles
import styles from './page.module.scss';
import { Keyword, keyword, searchKeywords } from '@/data/searchKeywords';
import RowScroll from '@/components/RowScroll';
// Page
export default function RecommendPage() {
  // Hooks
  const { location } = useGeolocation();
  // Refs
  const mapEl = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(0);
  // States
  const [map, setMap] = useState<kakao.maps.Map | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [keywordResults, setKeywordResults] = useState<KeywordResult[]>([]);
  const [keywordResultState, setKeywordResultState] = useState<
    'WAITING' | 'SUCCESS' | 'ERROR'
  >('WAITING');
  const [keyword, setKeyword] = useState<string>('');
  const [category, setCategory] = useState<string>('');
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
  //
  useEffect(() => {
    if (!map) return;
    if (!currentLocation) return;
    if (keywordResultState !== 'WAITING') return;
    // KeywordResults initialization
    setKeywordResults([]);
    // Pending counter reset
    pendingRef.current = searchKeywords.length;
    // KakaoMaps places service
    const places = new kakao.maps.services.Places(map);
    // Search keywords
    searchKeywords.map((keyword: Keyword) => {
      places.keywordSearch(
        keyword.keyword,
        (data: SearchResult[], status: kakao.maps.services.Status) => {
          // If success
          if (status === kakao.maps.services.Status.OK) {
            // Filter data results with category prefix
            const results = data.filter((d) =>
              d.category_name.startsWith(keyword.category)
            );
            // Set keywordResults state
            setKeywordResults((prev) => [
              ...prev,
              {
                name: keyword.name,
                keyword: keyword.keyword,
                results: results.sort(
                  (a, b) => (a.distance ?? 0) - (b.distance ?? 0)
                ),
              },
            ]);
          } else {
            // Set keywordResults state
            setKeywordResults((prev) => [
              ...prev,
              {
                name: keyword.name,
                keyword: keyword.keyword,
                results: [],
              },
            ]);
          }

          pendingRef.current -= 1;
          if (pendingRef.current === 0) {
            setKeywordResults((prev) =>
              [...prev].sort(
                (a, b) =>
                  b.results.length - a.results.length ||
                  a.name.localeCompare(b.name)
              )
            );
            setKeywordResultState('SUCCESS');
          }
        },
        {
          useMapCenter: true,
          radius: 1000,
        }
      );
    });
  }, [map, currentLocation, keywordResultState]);
  useEffect(() => {
    if (keywordResultState !== 'SUCCESS') return;
    setCategory(keywordResults[0].name);
  }, [keywordResults, keywordResultState]);
  useEffect(() => {
    if (!map) return;
    if (!keyword.length) return;
    const ps = new kakao.maps.services.Places(map);

    ps.keywordSearch(keyword, placesSearchCB, {
      useMapCenter: true,
      radius: 1000,
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
          <RowScroll style={{ gap: '0.5rem' }}>
            {keywordResults.length ? (
              keywordResults.map((result) => (
                <button
                  key={result.keyword}
                  className={[
                    styles.keywordButton,
                    category === result.name && styles.active,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    setCategory(result.name);
                  }}
                >
                  <span>{result.name}</span>
                  <span className={styles.count}>{result.results.length}</span>
                </button>
              ))
            ) : (
              <div>대기중</div>
            )}
          </RowScroll>
          <div>
            {category &&
              (
                keywordResults.find((results) => results.name === category)
                  ?.results ?? []
              ).map((r) => (
                <div key={r.id}>
                  <span>{r.place_name}</span>
                  <span>{r.distance}</span>
                </div>
              ))}
          </div>
        </div>
      </main>
      <TabBar />
    </>
  );
}
