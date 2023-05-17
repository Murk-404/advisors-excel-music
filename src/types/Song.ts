export type Song = {
  id: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  artist: string;
  title: string;
  length: string;
  image?: string;
};

export type NewSong = Omit<
  Song,
  "id" | "createdBy" | "createdAt" | "updatedBy" | "updatedAt"
>;

// export type NewSong = {
//   artist: string;
//   title: string;
//   length: string;
//   image?: string;
// };
