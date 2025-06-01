'use client';
// React
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
// Hooks
import useGeolocation from '@/hooks/useGeolocation';
// Types
import { SearchResult } from '@/types/kakao/maps/search';
// Styles
import styles from './page.module.scss';
// Props
type Props = Readonly<{
  keyword: string;
  category: string;
}>;
// Page
export default function Map({ keyword, category }: Props) {
  // Hooks
  const { location } = useGeolocation();
  // Refs
  const initializedRef = useRef(false);
  const mapEl = useRef<HTMLDivElement>(null);
  // States
  const [map, setMap] = useState<kakao.maps.Map | undefined>(undefined);
  const [isPanelExpanded, setIsPanelExpanded] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [center, setCenter] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [, setMarkers] = useState<kakao.maps.Marker[]>([]);
  // Memos
  // Debounced center updater
  const updateCenterWhenMapMoved = useMemo(
    () =>
      debounce((map: kakao.maps.Map) => {
        setCenter({
          latitude: map.getCenter().getLat(),
          longitude: map.getCenter().getLng(),
        });
      }, 500),
    []
  );
  // Current Geolocation updater
  useEffect(() => {
    if (!location) return;
    setCurrentLocation(location);
  }, [location]);
  // Map builder
  useEffect(() => {
    const { kakao } = window;
    if (!kakao) return;
    if (map) return;
    if (initializedRef.current) return;
    initializedRef.current = true;
    // Load map
    kakao.maps.load(() => {
      if (!mapEl.current) return;
      const center = new kakao.maps.LatLng(33.450701, 126.570667);
      const options = {
        center,
        level: 5,
      };
      // Set map on element
      const newMap = new kakao.maps.Map(mapEl.current!, options);
      kakao.maps.event.addListener(newMap, 'center_changed', () => {
        updateCenterWhenMapMoved(newMap);
      });
      setMap(newMap);
    });
  }, [map, updateCenterWhenMapMoved]);
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

    return () => {
      marker.setMap(null);
    };
  }, [map, currentLocation]);
  // Search pharmacies
  useEffect(() => {
    if (!map) return;
    if (!currentLocation) return;
    // KakaoMaps places service
    const places = new kakao.maps.services.Places(map);
    console.log('Searching for pharmacies with keyword:', keyword);
    // Search for pharmacies
    places.keywordSearch(
      keyword,
      (data: SearchResult[], status: kakao.maps.services.Status) => {
        console.log('Search Status:', status);
        // If success
        if (status === kakao.maps.services.Status.OK) {
          // Filter data results with category prefix
          const results = data.filter((d) =>
            d.category_name.startsWith(category)
          );
          console.log('Search Results:', data);
          // Set searchResults state
          setSearchResults(
            results.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
          );
        } else {
          // Set keywordResults state on failed
          setSearchResults([]);
        }
      },
      {
        useMapCenter: true,
        radius: 10000,
      }
    );
  }, [category, center, currentLocation, keyword, map]);
  // Pin markers on map
  useEffect(() => {
    if (!map) return;
    if (!searchResults) return;
    // Set new markers
    const newMarkers = searchResults.map((result) => {
      const position = new kakao.maps.LatLng(result.y, result.x);
      // If current pharmacy is set, make it bigger
      const size = 26;
      // Set marker data
      const pharmacyMarker = new kakao.maps.MarkerImage(
        '/icon-hospital.svg',
        new kakao.maps.Size(size, size),
        { offset: new kakao.maps.Point(size / 2, size / 2) }
      );
      // Make marker
      const marker = new kakao.maps.Marker({
        position,
        image: pharmacyMarker,
        clickable: true,
      });
      // Add click event to marker
      kakao.maps.event.addListener(marker, 'click', () => {
        // Move map to marker position
        map.panTo(position);
      });
      marker.setMap(map);
      return marker;
    });
    setMarkers((prev) => {
      prev.forEach((marker) => {
        marker.setMap(null); // Remove old markers from map
      });
      return newMarkers;
    });
  }, [map, searchResults]);
  // Render
  return (
    <>
      <div
        ref={mapEl}
        className={[styles.map, styles.active].filter(Boolean).join(' ')}
      ></div>
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
        <div className={styles.placeList}>
          {searchResults.map((r) => (
            <button key={r.id}>
              <span>{r.place_name}</span>
              <span>{r.distance}m</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
