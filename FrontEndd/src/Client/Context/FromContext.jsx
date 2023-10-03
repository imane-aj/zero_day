import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function FormContextProvider({ children }) {
  const [depart, setDepart] = useState();
  const [arrive, setArrive] = useState();
  const [selectedTrajet, setselectedTrajet] = useState();
  const [selectedDate, setselectedDate] = useState();
  const [selectedTime, setselectedTime] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [type, setType] = useState(null);
  const [cab, setCab] = useState();
  const [distance, setDistance] = useState();
  const [price, setPrice] = useState();
  const contextValue = {
    depart,
    setDepart,
    arrive,
    setArrive,
    selectedTrajet,
    setselectedTrajet,
    selectedDate,
    setselectedDate,
    selectedTime,
    setselectedTime,
    hour,
    setHour,
    minute,
    setMinute,
    type,
    setType,
    cab,
    setCab,
    price, setPrice
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}