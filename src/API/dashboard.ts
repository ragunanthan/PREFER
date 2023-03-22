import { ENDPOINTS, fetcher } from "./Fetcher";

type filterType = {
  authorId?: number;
};
type filterByBullIDType = {
  bullID: number;
};

type filterByYearType = {
  year: string;
};

export async function FetchByDate(
  filter: filterType &
    filterByBullIDType & {
      date: string;
    }
) {
  return await fetcher.post(ENDPOINTS.GETBYDATE, JSON.stringify(filter));
}

export async function FetchByMonth(
  filter: filterType & filterByYearType & { month: string }
) {
  return await fetcher.post(ENDPOINTS.GETBYMONTH, JSON.stringify(filter));
}

export async function FetchByYear(
  filter: filterType & filterByYearType & filterByBullIDType
) {
  return await fetcher.post(ENDPOINTS.GETBYYEAR, JSON.stringify(filter));
}
