export interface InputAttrsModel {
  type: string;
  id?: string;
  name?: string;
  value?: string;
  errorMessage?: string;
  isRequired?: boolean;
  onValidate?: () => {};
}
