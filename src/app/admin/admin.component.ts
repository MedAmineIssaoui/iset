import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService) {}
  users: any[] = [];
  add:boolean=false;
    newUser: any = {
      username: '',
      password: '',
      role: '',
      formations : []
    };
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    // Utilisez la méthode du service pour récupérer les utilisateurs
    this.authService.getUsers().subscribe((data) => {
      this.users = data.users;
    });
  }
  confirmer(){
    return this.add=true;
  }

  editUser(id:any){
    this.authService.editUser(id).subscribe();
  }

  addUser() {
    console.log(this.newUser);
    this.authService.addUser(this.newUser).subscribe(
      (addedUser) => {
        this.users.push(addedUser);
        this.newUser = {
          id:0,
          username: '',
          role: '',
          password: '',
          formations : []
        };
        this.add = false;
      },)
    }

  deleteUser(id:any){
    this.authService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter((user) => user.id !== id);
      },
    );
  }
}
