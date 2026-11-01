import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from '../assets/pothole-icon.png';

const potholeIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

function buildPopup(p) {
    const el = document.createElement('div');

    if (p.imageUrl) {
        const img = document.createElement('img');
        img.src = p.imageUrl;
        img.alt = 'Pothole';
        img.style.width = '240px';
        img.style.maxWidth = '100%';
        el.appendChild(img);
    }

    const caption = document.createElement('p');
    caption.textContent = p.note || 'No additional details';
    el.appendChild(caption);

    return el;
}

export default function PotholeMap({ potholes = [] }) {
    const containerRef = useRef(null);
    const groupRef = useRef(null);

    useEffect(() => {
        const map = L.map(containerRef.current, {
            center: [12.9716, 77.5946],
            zoom: 12,
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
            if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return;

            L.marker([p.lat, p.lng], {
                icon: potholeIcon,
                title: 'Pothole',
            })
                .bindPopup(buildPopup(p), { maxWidth: 260 })
                .addTo(group);
        });
    }, [potholes]);

    return <div ref={containerRef} style={{ height: '100vh', width: '100%' }} />;
}
