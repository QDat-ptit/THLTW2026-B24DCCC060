export type Employee = {
  id: number;
  name: string;
  maxPerDay: number;
  workTime: string;
};

export type Service = {
  id: number;
  name: string;
  price: number;
  duration: number;
};

export const initEmployees: Employee[] = [
  { id: 1, name: 'Anh Tuấn', maxPerDay: 5, workTime: '09:00-17:00' },
  { id: 2, name: 'Chị Lan', maxPerDay: 4, workTime: '09:00-17:00' },
];

export const initServices: Service[] = [
  { id: 1, name: 'Cắt tóc', price: 100000, duration: 30 },
  { id: 2, name: 'Spa mặt', price: 300000, duration: 60 },
];