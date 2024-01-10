import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from'../service/formation.service'
import { AuthService } from '../service/auth.service'
import { Router } from '@angular/router';
import { SessionService } from '../service/session.service'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  formationId: number=0;
  formations: any;
  sessions: any;
  constructor(
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router,
    private sess:SessionService,
    private form:FormationService
  ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.formationId = +params['id'];
      this.loadFormationDetails();
      this.loadSessionDetails();
    });
  }
  loadFormationDetails(): void {
    this.form.getFormationById(this.formationId).subscribe(
      (formation)=>{
        this.formations=[formation];
      }
    );
  }
  loadSessionDetails(){
    this.sess.getSession(this.formationId).subscribe(
      (sessions) => {
        this.sessions = [sessions];}
        )}
  inscrit(session: any): void {
    if (this.AuthService.islogin()) {
      this.AuthService.getFormations().subscribe(
        (userFormations: string[]) => {
          if (userFormations.includes(session.formation_id)) {
            console.log('User is already registered for this session.');
            return;
          } else if (session.registered_candidates < session.max_candidates) {
            session.registered_candidates++;
            this.sess.addCandidate(this.formationId)
    }})} else {
      this.router.navigate(['login']);
  }
}
}
