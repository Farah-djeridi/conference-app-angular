export interface Conference {
  id: string;
  title: string;
  description: string;
  date: string;
  place: string;
  maxParticipants: number;
  nbParticipants: number;
  category?: string;
}
