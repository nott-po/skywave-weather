"use client";

import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";
import defaultStates from "@/app/utils/defaultStates";

// Create Contexts
const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

// Global Context Provider
export const GlobalContextProvider = ({ children }) => {
    const [forecast, setForecast] = useState({});
    const [unit, setUnit] = useState("°C");
    const [airQuality, setAirQuality] = useState({});
    const [fiveDayForecast, setFiveDayForecast] = useState({});
    const [uvIndex, setUVIndex] = useState({});
    const [geoCodedList, setGeoCodedList] = useState(defaultStates);
    const [inputValue, setInputValue] = useState("");
    const [activeCityCoordinates, setActiveCityCoordinates] = useState([52.2298, 21.0122]);


    const fetchForecast = async () => {
        try {
            const response = await axios.get("/api/weather");
            setForecast(response.data);
            {/*console.log("Fetched forecast:", response.data);*/}
        } catch (error) {
            console.error("Error fetching forecast data:", error.message);
        }
    };

    const fetchAirQuality = async () => {
        try {
            const response = await axios.get("/api/pollution");
            {/*console.log("Fetched air data:", response.data);*/}
            setAirQuality(response.data);
        } catch (error) {
            console.error("Error fetching forecast data:", error.message);
        }
    }

    const fetchFiveDayForecast = async () => {
        try {
            const response = await axios.get("/api/fiveDays");
            {/*console.log("Fetched five days data:", response.data);*/}
            setFiveDayForecast(response.data);
        } catch (error) {
            console.error("Error fetching 5-day forecast:", error.message);
        }
    };

    const fetchUVIndex = async () => {
        try {
            const response = await axios.get("/api/uv");
            {/*console.log("Fetched uv index data:", response.data);*/}
            setUVIndex(response.data);
        } catch (error) {
            console.error("Error fetching uv index data:", error.message);
        }
    }

    const handleInput = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);

        if (newValue === "") {
            setGeoCodedList(defaultStates);
        }
    };


    useEffect(() => {
        fetchForecast();
        fetchAirQuality();
        fetchFiveDayForecast();
        fetchUVIndex();
    }, []);



    const contextValue = {
        forecast,
        unit,
        setForecast,
        setUnit,
        airQuality,
        setAirQuality,
        fiveDayForecast,
        setFiveDayForecast,
        uvIndex,
        setUVIndex,
        geoCodedList,
        setGeoCodedList,
        inputValue,
        handleInput,
        activeCityCoordinates,
        setActiveCityCoordinates,
    }

    return (
        <GlobalContext.Provider value={contextValue
        }>
            <GlobalContextUpdate.Provider value={fetchForecast}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
};


// Custom Hooks for Context Usage
export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
