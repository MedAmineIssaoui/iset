import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service'

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionUrl = "http://localhost:3000/sessions"

  constructor(private http: HttpClient,private AuthService: AuthService) { }

  getSession(formationId : any){
    return this.http.get<any[]>(`${this.sessionUrl}/${formationId}`);
  }

  addCandidate(formationId: any) {
    this.getSession(formationId).subscribe((session: any) => {
      session.registered_candidates += 1;
      this.http.put(`${this.sessionUrl}/${formationId}`, session).subscribe(() => {
        this.AuthService.addFormation(formationId);
      });
    });
  }

}
