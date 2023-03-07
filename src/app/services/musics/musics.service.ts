import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Music {
  id?: number;
  title: string;
  description: string;
  album: string;
  artist: string;
  duration: string;
  date: Date;
  styles: string[];
  picture: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class MusicsService {
  private musics = new BehaviorSubject<string>('');
  private urlServer: any = {};

  constructor(private readonly http: HttpClient) {
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(
      (key: string) =>
        (this.urlServer[key] = `${baseUrl}${
          (environment.backend.endpoints as any)[key]
        }`)
    );
  }

  get musics$(): Observable<string> {
    return this.musics.asObservable();
  }

  updatedMusicsList(data: string) {
    this.musics.next(data);
  }

  fetch(): Observable<Music[]> {
    return this.http.get<Music[]>(this.urlServer.allMusics);
  }

  fetchRandomMusic(): Observable<Music[]> {
    return this.http.get<Music[]>(this.urlServer.randomMusic);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.urlServer.oneMusic.replace(':id', id));
  }

  create(music: Music): Observable<Music> {
    return this.http.post<Music>(this.urlServer.allMusics, music);
  }

  fetchOne(id: string): Observable<Music> {
    return this.http.get<Music>(this.urlServer.oneMusic.replace(':id', id));
  }

  update(music: Music): Observable<Music> {
    return this.http.put<Music>(
      this.urlServer.oneMusic.replace(':id', music.id),
      music
    );
  }
}
