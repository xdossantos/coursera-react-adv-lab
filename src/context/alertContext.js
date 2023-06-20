import { createContext, useContext, useMemo, useState } from "react";

const defaultAlertState = {
  alertState: {
    isOpen: false,
    // Type can be either "success" or "error"
    type: "success",
    // Message to be displayed, can be any string
    message: ""
  },
  setAlertState: () => {},
  onClose: () => {},
};

export const AlertContext = createContext(defaultAlertState);

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState(defaultAlertState);
  const onClose = () =>
    setAlertState({
      isOpen: false,
      message: "",
    });
  
    const onOpen = (response) =>
      setAlertState({
        isOpen: true,
        ...response,
      });
  
  const state = useMemo(
    () => ({ alertState, setAlertState, onClose, onOpen }),
    [alertState]
  );

  return (
    <AlertContext.Provider value={state}>{children}</AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
