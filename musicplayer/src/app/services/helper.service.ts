import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  baseUrl = environment.serverUrl;
constructor(private http: HttpClient) { }

uploadImage(music: any): any {
  return this.http.post(this.baseUrl + 'player/upload', music, {
    reportProgress: true,
    observe: 'events'
  }).pipe(
    map(event => this.getEventMessage(event)));
  }

getEventMessage(event: HttpEvent<any>): any {
  if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round(100 * event.loaded / (event.total || 1));
      return {
        mode: 'progress',
        percent: percentDone
      };
  } else if (event.type === HttpEventType.Sent) {
    return {
      mode: 'init',
    };
  }
 else if (event.type === HttpEventType.Response) {
  return {
    mode: 'finish',
    message: event.body
  };
}
  }
}
