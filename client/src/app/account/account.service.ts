import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(data: any) {
    return this.httpClient.post(this.apiUrl + 'account/login', data).pipe(
      map( (u: IUser) => {
        if(u) {
          localStorage.setItem('token', u.token);
          this.currentUserSource.next(u);
        }
      })
    );
  }

  register(data: any) {
    return this.httpClient.post(this.apiUrl + 'account/register', data).pipe(
      map( (u: IUser) => {
        localStorage.setItem('token', u.token);
        this.currentUserSource.next(u);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  isEmailRegistered(email: string) {
    return this.httpClient.get(this.apiUrl + 'account/emailregistered?email=' + email);
  }

  getCurrentUser(token: string) {
    if(token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.httpClient.get(this.apiUrl + 'account', {headers}).pipe(
      map( (u: IUser) => {
        localStorage.setItem('token', u.token);
        this.currentUserSource.next(u);
      })
    );
  }
}
