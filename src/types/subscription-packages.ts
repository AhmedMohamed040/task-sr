export interface IStandardsManagment {
  id: string;
  image: string;
  arabic_name: string;
  english_name: string;
  arabic_measurement: string;
  english_measurement: string;
  value: string;
}
export interface ICenterSettings {
  id: string;
  image: string;
  center_type_ar: string;
  center_type_en: string;
}

export interface Sports {
  id: string;
  image: string;
  arabic_name: string;
  english_name: string;
}
export interface IJobRole {
  id: string;
  image: string;
  arabic_job_type: string;
  english_job_type: string;
}
