import { createContext, ReactNode, useState } from "react";

interface BlogStepperContextProps {
  active: number;
  setActive: (step: number) => void;
}

export const BlogStepperContext = createContext<
  BlogStepperContextProps | undefined
>(undefined);

export const BlogStepperProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(0);

  return (
    <BlogStepperContext.Provider value={{ active, setActive }}>
      {children}
    </BlogStepperContext.Provider>
  );
};
