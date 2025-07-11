export const API_BASE_URL = 'http://localhost:8080/api/v1';

// Images --------------------------------------
export const searchImages = async (query) => {
    const response = await fetch(`${API_BASE_URL}/images/${query && `search?query=${encodeURIComponent(query)}`}`);
    let data = [], error = null;

    if(response.ok){
        data = await response.json();
    } else {
        error = await response.text();
    }
    return {data, error};
}

// Collections -------------------------------
export const getAllCollections = async () => {
    const response = await fetch(`${API_BASE_URL}/collections`);
    let data = []
    data = await response.json();
    console.log(data);
    return data;
}

export const getImage = async (id) => {
    const response = await fetch(`${API_BASE_URL}/images/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
}

// Profiles


// Auth