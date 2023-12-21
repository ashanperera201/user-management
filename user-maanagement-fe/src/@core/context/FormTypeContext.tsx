
import { createContext, useEffect, useState } from "react";


export const FormTypeContext = createContext<any>({});

const FormTypeContextProvider = ({ children } : any) => {
  const [type, setType] = useState('')  

    return (
      <FormTypeContext.Provider value={{ type, setType}}>
        {children}
      </FormTypeContext.Provider>
    );
};

export default FormTypeContextProvider
