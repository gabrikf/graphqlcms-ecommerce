interface IInitialValues {
  description: { matches: { pattern: string } };
  rate: { gte: number };
  price: { gte: number; lte: number };
  orderBy: string;
}

interface INewFilterValues {
  description?: string;
  rateGte?: number | null;
  priceGte?: number | null;
  priceLte?: number | null;
  orderBy?: string;
}

export default class FilterBuilder {
  public static build(
    newFilter: INewFilterValues,
    currentFilter: IInitialValues
  ): IInitialValues {
    return {
      description: {
        matches: {
          pattern:
            newFilter.description || currentFilter.description.matches.pattern,
        },
      },

      price: {
        gte: newFilter.priceGte || currentFilter.price.gte,
        lte: newFilter.priceLte || currentFilter.price.lte,
      },
      rate: {
        gte: newFilter.rateGte || currentFilter.rate.gte,
      },
      orderBy: newFilter.orderBy || currentFilter.orderBy,
    };
  }
}
