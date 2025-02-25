import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from "nuqs";



export const useTransportationMethod = () => {
  const [methods, setMethods] = useQueryState("method",parseAsArrayOf(parseAsStringLiteral(["all","trains","buses","trams"])).withDefault(["all"]).withOptions({
    clearOnDefault: true,
  }));

  return { methods, setMethods };
};
