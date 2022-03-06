import { createContext, ReactNode, useContext, useState } from "react";

interface IFilterProviderProps {
  children: ReactNode;
}

interface IFilterContext {
  dispatchFilter: (params: IInitialValues) => void;
  filters: IInitialValues;
  initalState: IInitialValues;
}

interface IInitialValues {
  description: { matches: { pattern: string } };
  rate: { gte: number };
  price: { gte: number; lte: number };
  orderBy: string;
}

const FilterContext = createContext({} as IFilterContext);

export function FilterProvider({ children }: IFilterProviderProps) {
  const initalState: IInitialValues = {
    description: { matches: { pattern: "" } },
    rate: { gte: 0 },
    price: { gte: 0, lte: 99999 },
    orderBy: "_createdAt_DESC,",
  };
  const [filters, setFilters] = useState(initalState);

  function dispatchFilter(params: IInitialValues) {
    setFilters((prev) => {
      return {
        ...prev,
        ...params,
      };
    });
  }

  return (
    <FilterContext.Provider value={{ initalState, filters, dispatchFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  return context;
}
