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
  formations: any;
  sessions: any;
  constructor(
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private router: Router,
    private sess:SessionService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.formations = params;
      console.log(this.formations);
      this.sessions = this.sess.getSession(params.id)
    });
  }
  

  inscrit() {
    let id = localStorage.getItem('userId');
    let formationList: any = [];
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('password');
    formationList.push(localStorage.getItem('userformation'));
let userInformations : any =  [...formationList, this.formations.id]

    if (id) {
      let dataTOupdate = {
        id: id,
        username: username,
        password: password,
        formation:userInformations
      };
      this.AuthService.updateUser(dataTOupdate);
    localStorage.removeItem("userformation")
    localStorage.setItem('userformation', userInformations);


    } else {
      this.router.navigate(['/login']);
    }
  }
}
