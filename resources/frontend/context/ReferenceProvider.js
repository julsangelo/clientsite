import React, { createContext, useState, useEffect, useContext } from "react";
import { getReferences } from "../ajax/backend";

let referenceContext = createContext();

export const ReferenceProvider = ({ children }) => {
    const [references, setReferences] = useState({});

    useEffect(() => {
        getReferences((data) => {
            setReferences(data);
        });
    }, []);

    return (
        <referenceContext.Provider value={{ references }}>
            {children}
        </referenceContext.Provider>
    );
};

export let useReference = () => useContext(referenceContext);
