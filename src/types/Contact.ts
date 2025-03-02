export interface Contact {
  id: number;
  name: string;
  email: string;
  cellphone_number: string;
  phone_number: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipcode: string | null;
  country: string | null;
  photo: string | null;
}