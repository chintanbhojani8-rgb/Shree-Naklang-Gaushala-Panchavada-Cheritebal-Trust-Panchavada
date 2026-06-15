export interface Cow {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'Female' | 'Male';
  health: 'Healthy' | 'Sick' | 'Under Treatment' | 'Critical';
  weight: string;
  color: string;
  tagNumber: string;
  photo: string;
  price: string;
  dateAdded: string;
  notes: string;
}

export interface Bill {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  vendor: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  photos: string[];
  videoUrl: string;
}
