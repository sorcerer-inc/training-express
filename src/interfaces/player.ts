interface Player {
    id?: number;
    name?: string;
    hp?: number;
    mp?: number;
    money?: number;
    [key: string]: number | string | undefined;
  }

  export { Player };