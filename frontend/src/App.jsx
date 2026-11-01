import './App.css'
import PotholeMap from './components/PotholeMap'
function App() {
const potholes = [
    {
        id: 1,
        lat: 12.9716,
        lng: 77.5946,
        imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400",
        note: "Sample pothole near MG Road"
    },
    {
        id: 2,
        lat: 12.9352,
        lng: 77.6245,
        imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400",
        note: "Sample road damage near Koramangala"
    },
    {
        id: 3,
        lat: 12.9698,
        lng: 77.7500,
        imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400",
        note: "Sample road damage near Whitefield"
    }
];
  return (
    <>
      <PotholeMap potholes={potholes}/>
    </>
  )
}

export default App
