export interface ISubscriberCard {
  id: string;
  name: string;
  type: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
  address: string;
  numberOfBranches: number;
  workingHours: string;
}

export interface IEmployee {
  id: string;
  name: string;
  image: string;
  email: string;
  last_login: string;
  rating: number;
  working: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface IPlayer {
  id: string;
  name: string;
  image: string;
  email: string;
  sports: { name_ar: string; name_en: string }[];
  rating: number;
  working: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface ISportsActivities {
  id: string;
  name: string;
  image: string;
}


export interface ISubscriptionStatus   {
  id: string;
  academy_name: string;
  image: string;
  duration: { en_duration: string; ar_durration: string };
  sports: { name_ar: string; name_en: string };
  rating: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export type ISubscription = {
  id: string;
  name: string;
  image:  string;
  price: number;
  startDate: string;
  endDate:string;
  number_of_subscribers?: number;
  duration_for_days?:number;
  status?:boolean;
  functions: string[];
}
