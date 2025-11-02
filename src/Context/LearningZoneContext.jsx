import { createContext, useState } from "react";

export const LearningZoneContext=createContext();

export const LearningZoneContextProvider=({children})=>{

    const [learningData, setLearningData]=useState([])

    return (
        <LearningZoneContext.Provider value={{learningData, setLearningData}}>
            {children}
        </LearningZoneContext.Provider>
    )
}