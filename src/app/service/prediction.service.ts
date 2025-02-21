import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'https://alzheimer-back.vercel.app/predict';
  private res="boo";
  constructor(private http: HttpClient) {}




    sendData(file: any): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      return this.http.post<any>(this.apiUrl, formData);
    }

    storeResult(result: any) {
      this.res = result;
    }
    getResult() {
      return this.res;
    }


}
