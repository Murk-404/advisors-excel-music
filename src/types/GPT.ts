export type GPTResponse = {
  created: number;
  data: Choice[];
};

export type Choice = {
  url: string;
};
