export interface ServerResponse {
  data: any[] | any;
  message?: string;
}

interface Msg {
  summary: string;
  detail: string;
  code: string;
}
