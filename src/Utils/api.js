export const API_BASE_URL = `${process.env.REACT_APP_SPRING_BACKEND_URL}`;


// Images --------------------------------------
export const searchImages = async (query) => {
    const response = await fetch(`${API_BASE_URL}/images/${`search?query=${encodeURIComponent(query)}`}`);
    let data = [];

    if(response.ok){
        data = await response.json();
    }

    return data;
}

// Collections -------------------------------
export const getAllCollections = async () => {
    console.log("API: " + API_BASE_URL)
    const response = await fetch(`${API_BASE_URL}/collections`);
    let data = []
    data = await response.json();
    return data;
}

export const getAllCollectionsWithImageId = async (imageId) => {
    const response = await fetch(`${API_BASE_URL}/collections/including/${imageId}`);
    let data = []
    data = await response.json();
    return data;
}

export const removeImageFromCollection = async (collectionId, imageId) => {
    return await fetch(`${API_BASE_URL}/collections/${collectionId}/images/${imageId}`, {
        method: 'DELETE'
    });
}

export const addImageToCollection = async (collectionId, imageId) => {
    return await fetch(`${API_BASE_URL}/collections/${collectionId}/images/${imageId}`, {
        method: 'POST'
    });
}


export const getCollection = async (id) => {
    const response = await fetch(`${API_BASE_URL}/collections/${id}`);
    let data = []
    data = await response.json();
    return data;
}

export const getImage = async (id) => {
    const response = await fetch(`${API_BASE_URL}/images/${id}`);
    return await response.json();
}


// Profiles


// Auth