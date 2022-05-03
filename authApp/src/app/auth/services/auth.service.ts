import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import {  catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string  = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  login(email:string, password: string){
    const url  = `${this.baseUrl}/auth`;
    const body =  {email, password};

    //sweet alert
    // https://www.udemy.com/home/my-courses/learning/  ->  npm install sweetalert2

    return this.http.post<AuthResponse>(url, body )
          .pipe(
              tap(resp => {
                if(resp.ok){
                  localStorage.setItem('token', resp.token!);
                  // this._usuario = {
                  //   name: resp.name!,
                  //   uid:  resp.uid!
                  // }
                }
              }),
              map(  resp => resp.ok),
              catchError(err => of(err.error.msg))
          )
    ;
  }

  validarToken(): Observable<boolean>{
    const url  = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
                        .set('x-token',localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers}).pipe(
      map(  resp => { 
            
              localStorage.setItem('token', resp.token!);
              this._usuario = {
                name: resp.name!,
                uid:  resp.uid!,
                email: resp.email!

              }
            return resp.ok
          }
        ),
        catchError(error => of(false))
    );

  }


  logout(){
    //localStorage.removeItem('token');
    localStorage.clear();
  }


  registro(name:string, email:string, password: string){
    const url  = `${this.baseUrl}/auth/new`;
    const body =  {email, password, name};

    //sweet alert
    // https://www.udemy.com/home/my-courses/learning/  ->  npm install sweetalert2

    return this.http.post<AuthResponse>(url, body )
          .pipe(
              tap(resp => {
                console.log('responseAuth', resp);
                if(resp.ok){
                  localStorage.setItem('token', resp.token!);
                  // this._usuario = {
                  //   name: resp.name!,
                  //   uid:  resp.uid!
                  // }
                }
              }),
              map(  resp => resp.ok),
              catchError(err => of(err.error.msg))
          )
    ;
  }

}
