import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom'

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from '../assets/pothole-icon.png';

const potholeIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

function createPopupContent(p) {
    const el = document.createElement('div');
    el.style.width = 'min(400px, 70vw)';
    el.style.textAlign = 'center';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.gap = '8px';
    el.style.fontFamily = 'Arial, sans-serif';


    if (p.image_url) {
        const img = document.createElement('img');
        img.src = p.image_url;
        img.alt = 'Pothole';
        img.loading = 'lazy';
        img.style.width = '100%';
        img.style.aspectRatio = '1 / 1';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '8px';
        el.appendChild(img);
    }

    const caption = document.createElement('p');
    caption.textContent = p.description || 'No additional details';
    el.appendChild(caption);

    return el;
}
export default function PotholeMap({ potholes = [] }) {

    const [searchParams] = useSearchParams();

    const lat = parseFloat(searchParams.get('lat'));
    const lng = parseFloat(searchParams.get('lng'));
    const zoom = parseInt(searchParams.get('zoom')) || 13;
    const hasZoom = Number.isFinite(zoom) && zoom >= 0 && zoom <= 19;
    const hasPosition = Number.isFinite(lat) && Number.isFinite(lng);
    const containerRef = useRef(null);
    const groupRef = useRef(null);

    useEffect(() => {
        const map = L.map(containerRef.current, {
            center: hasPosition ? [lat, lng] : [12.9716, 77.5946],
            zoom: hasZoom ? zoom : 13,
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        groupRef.current = L.featureGroup().addTo(map);

        return () => {
            map.remove();
            groupRef.current = null;
        };
    }, []);

    useEffect(() => {
        const group = groupRef.current;
        if (!group) return;

        group.clearLayers();

        potholes.forEach((p) => {
            if (!Number.isFinite(p.latitude) || !Number.isFinite(p.longitude)) return;

            L.marker([p.latitude, p.longitude], {
                icon: potholeIcon,
                title: 'Pothole',
            })
                .bindPopup(createPopupContent(p), { maxWidth: 400 })
                .addTo(group);
        });
    }, [potholes]);

    return <div ref={containerRef} style={{ height: '100vh', width: '100%' }} />;
}