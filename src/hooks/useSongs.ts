import { useQuery } from "react-query";
import { getSongs } from "../services/songService.ts";

export function useGetSongs() {
  return useQuery({
    queryKey: "songs",
    queryFn: getSongs,
  });
}
