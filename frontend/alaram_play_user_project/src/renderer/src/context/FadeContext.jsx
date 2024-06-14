import { createContext, useState } from "react";

export const FadeContext = createContext({})
export const FadeProvider = ({children}) => {

  const [fade, setFade] = useState(false);
  const handleFadeOpen = () => setFade(true);
  const handleFadeClose = () => setFade(false);

  return(
    <FadeContext.Provider value={{
      fade, setFade,
      handleFadeOpen,
      handleFadeClose,
    }}>
      {children}
    </FadeContext.Provider>
  )
}
