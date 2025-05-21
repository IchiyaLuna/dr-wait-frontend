'use client';
// React
import React, { useEffect, useRef, useState } from 'react';
// Hooks
import useGeolocation from '@/hooks/useGeolocation';
// Components
import TopBar from '@/components/TopBar';
import TabBar from '@/components/TabBar';
import RowScroll from '@/components/RowScroll';
// Data
import { Keyword, searchKeywords } from '@/data/searchKeywords';
// Types
import { KeywordResult, SearchResult } from '@/types/kakao/maps/search';
// Styles
import styles from './page.module.scss';
// Page
export default function RecommendPage() {
  // Hooks
  const { location } = useGeolocation();
  // Refs
  const mapEl = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(0);
  // States
  const [isPanelExpanded, setIsPanelExpanded] = useState<boolean>(false);
  const [map, setMap] = useState<kakao.maps.Map | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [keywordResults, setKeywordResults] = useState<KeywordResult[]>([]);
  const [keywordResultState, setKeywordResultState] = useState<
    'WAITING' | 'SUCCESS' | 'ERROR'
  >('WAITING');
  const [category, setCategory] = useState<string>('');
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
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
  // Keywords search
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
            // Set keywordResults state on failed
            setKeywordResults((prev) => [
              ...prev,
              {
                name: keyword.name,
                keyword: keyword.keyword,
                results: [],
              },
            ]);
          }
          // Pending counter decrease
          pendingRef.current -= 1;
          // No pending search left
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
          radius: 300,
        }
      );
    });
  }, [map, currentLocation, keywordResultState]);
  // Default category selector
  useEffect(() => {
    if (keywordResultState !== 'SUCCESS') return;
    // Set first result as default selection
    setCategory(keywordResults[0].name);
  }, [keywordResults, keywordResultState]);
  // Pin
  useEffect(() => {
    if (!map) return;
    if (!category) return;
    // Find result by category and set marker
    (
      keywordResults.find((results) => results.name === category)?.results ?? []
    ).map((r) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(r.y, r.x),
      });
      setMarkers((prev) => [...prev, marker]);
    });
  }, [category, keywordResults, map]);
  // Render
  return (
    <>
      <TopBar />
      <main className={styles.main}>
        <div ref={mapEl} className={styles.map}></div>
        <div
          className={[styles.panel, isPanelExpanded && styles.expanded]
            .filter(Boolean)
            .join(' ')}
        >
          <button onClick={() => setIsPanelExpanded(!isPanelExpanded)}>
            {isPanelExpanded ? (
              <i className={'fa-solid fa-chevron-down'} />
            ) : (
              <i className={'fa-solid fa-chevron-up'} />
            )}
          </button>
          <RowScroll className={styles.keywordList}>
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
                    markers.map((marker) => {
                      marker.setMap(null);
                    });
                    setMarkers([]);
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
          <div className={styles.placeList}>
            {category &&
              (
                keywordResults.find((results) => results.name === category)
                  ?.results ?? []
              ).map((r) => (
                <button key={r.id}>
                  <span>{r.place_name}</span>
                  <span>{r.distance}m</span>
                </button>
              ))}
          </div>
        </div>
      </main>
      <TabBar />
    </>
  );
}
