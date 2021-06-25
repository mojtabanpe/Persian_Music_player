import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  baseUrl = environment.serverUrl;
constructor(private http: HttpClient) { }

  getMusics(): any {
    return this.http.get(this.baseUrl + 'player/musics');
  }

  addMusic(music: any): any {
    return this.http.post(this.baseUrl + 'player/musics', music);
  }
}
