import { BrokenRiceDocument, SideDish } from './schema';

export interface BrokenRice {
  id: string;
  name: string;
  description: string;
  sideDishes: SideDish[];
  imgSrc: string;
  priceCents: number;
}

export interface BrokenRiceResponse {
  brokenRices: BrokenRiceDocument[];
  connection: BrokenRiceConnection;
}

export interface BrokenRiceConnection {
  cursor: string;
  totalCount: number;
  hasNextPage: boolean;
}
