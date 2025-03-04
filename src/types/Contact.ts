export interface Contact {
  id: number;
  name: string;
  date_of_birth: string;
  email: string;
  cellphone_number: string;
  phone_number: string;
  address: string | null;
  district: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  photo: string | null;
  uploaded_photo: File | null;
}