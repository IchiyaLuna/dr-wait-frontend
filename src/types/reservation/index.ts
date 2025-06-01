export interface Reservation {
  reservationId: string;
  hospitalId: string;
  userId: string;
  userFullname: string;
  role: string;
  symptomName: string;
  firstVisit: boolean;
  message: string;
  completed: boolean;
  waitingOrder: number;
  waitingTime: number;
  confirmed: boolean;
  reservationTime: Date;
}
