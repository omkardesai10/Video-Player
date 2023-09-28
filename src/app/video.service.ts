import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Video } from './video';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _getUrl = "http://localhost:3000/api/videos";
  private _postUrl = "http://localhost:3000/api/video";
  private _putUrl = "http://localhost:3000/api/video/";
  private _deleteUrl = "http://localhost:3000/api/video/";
  // private _getUrl = "api/videos";
  // private _postUrl = "api/video";
  // private _putUrl = "api/video/";

  constructor(private _http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this._http.get<Video[]>(this._getUrl);
  }

  // addVideo(video: Video): Observable<Video[]> {
  //   return this._http.post<Video[]>(this._postUrl, JSON.stringify(video));
  //}

  // addVideo(video: Video): Observable<Video[]> {
  //   let headers = new HttpHeaders({'Content-Type':'application/json'})
  //   return this._http.post<Video[]>(this._postUrl, JSON.stringify(video), {headers: headers});
  // }

  addVideo(video: Video): Observable<Video> {
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    let options = {headers: headers}
    return this._http.post<Video>(this._postUrl, video, options);
  }

  updateVideo(video: Video): Observable<Video> {
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    let options = {headers: headers}
    return this._http.put<Video>(this._putUrl + video._id, video, options);
  }

  deleteVideo(video: Video) {
    return this._http.delete(this._deleteUrl + video._id);
  }

  // getVideos(): Observable<Video[]> {
  //   return this._http.get<Video[]>(this._getUrl).pipe(catchError(this.errorHandler));
  // }

  // return this._http.get(this._getUrl, {observe: 'response'});

//   getVideos() {
//     return this._http.get(this._getUrl).pipe(map(response: Response) => response.json());
//   }
// 

}
