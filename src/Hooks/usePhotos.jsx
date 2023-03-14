import {useState, useEffect, createContext, Children} from 'react';
import { useDebouncedEffect } from './useDebounceEffect';

export const PhotosContext = createContext();

export const usePhotos = () => {
    
}


export default function PhotosProvider({children}){
    //vars
    const [photos, setPhotos] = useState([]);
    const [Searchlabel, setSearchLabel] = useState('');

    //effects
    useEffect(() => {
      
      getAllPhotos()  
    
    }, []);

    useDebouncedEffect(() => {

        if(!Searchlabel){
            getAllPhotos();
            return setSearchLabel('');
        } else {
            SearchByLabel(Searchlabel);
        }

        // console.log("debounce call")

    },300,[Searchlabel])
    

    //methods
    const getAllPhotos = () => {
        
        fetch("http://localhost:8080/photos-sorted")
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setPhotos(data)
        })
        .catch(err => {
            console.log(err);
            setPhotos([]);
        })
    }

    const SearchByLabel = (label) => {
        fetch(`http://localhost:8080/photos/${Searchlabel.toLowerCase()}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.length > 0 ? setPhotos(data) : setPhotos([]);
        })
        .catch(err => {
            console.log(err);
            setPhotos([]);
        })
    }

    const addPhoto = (newImage) => {
        const newList = [newImage,...photos];
        setPhotos(newList);
    }



    const value = {
        photos,
        getAllPhotos,
        addPhoto,
        SearchByLabel,
        Searchlabel,
        setSearchLabel,
    }
    return (
        <PhotosContext.Provider value={value}>
            {children}
        </PhotosContext.Provider>
    );
}