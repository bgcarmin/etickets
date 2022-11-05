import { ITicket } from "./ITicket"

export interface IPaging {
    pageNumber: number;
    pageSize: number;
    count: number;
    items: ITicket[];
  }

  export class Paging implements IPaging {
    pageNumber: number;
    pageSize: number;
    count: number;
    items: ITicket[] = [];
  }
  
