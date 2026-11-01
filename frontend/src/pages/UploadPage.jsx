import '../styles/uploadpage.css';

const API = 'https://road-report-y1tk.onrender.com/api';

function uploaddata(formData) {
    return fetch(`${API}/upload_pothole`, {
        method: 'POST',
        body: formData,
    });
}

export default function UploadPage() {
    return (
        <div className="upload-page">
            <div className="upload-card">
                <div className="upload-header">
                    <h1>Report a Pothole</h1>
                    <p>Help make roads safer by reporting potholes in your area.</p>
                </div>

                <form
                    className="upload-form"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const formData = new FormData(e.target);
                        await uploaddata(formData);
                        window.location.href = `/?lat=${formData.get('latitude')}&lng=${formData.get('longitude')}&zoom=16`;
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="image">Pothole Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="number"
                                id="latitude"
                                name="latitude"
                                placeholder="12.9716"
                                step="any"
                                min="-90"
                                max="90"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                type="number"
                                id="longitude"
                                name="longitude"
                                placeholder="77.5946"
                                step="any"
                                min="-180"
                                max="180"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Describe the pothole location or its severity..."
                            rows="4"
                        />
                    </div>
                    <button type="submit" className="upload-submit">
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
}