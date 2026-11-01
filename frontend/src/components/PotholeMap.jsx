import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

function buildPopup(p) {
    const el = document.createElement('div');
    const img = document.createElement('img');
    img.src = p.imageUrl;
    img.style.width = '240px';
    const caption = document.createElement('p');
    caption.textContent = p.note;
    el.append(img, caption);
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
            L.marker([p.lat, p.lng], { title: 'Pothole' })
                .bindPopup(buildPopup(p), { maxWidth: 260 })
                .addTo(group);
        });
    }, [potholes]);

    return <div ref={containerRef} style={{ height: '100vh', width: '100%' }} />;
}