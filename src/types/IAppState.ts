import { IDesk } from "types/IDesk";
import { IEmployee } from "types/IEmployee";

export interface IAppState {
  desks: IDesk[];
  employees: IEmployee[];
  assignment: Record<number, number | null> | null;
}
