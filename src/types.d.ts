type Story = {
  id: number;
  title?: string;
  url?: string;
  by: string;
  time: number;
  score?: number;
  descendants?: number;
  kids: number[];
  type: string;
  text: string;
  parent: number;
};
