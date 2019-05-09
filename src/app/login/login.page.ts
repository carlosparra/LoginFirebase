import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""
  header: string = ""
  message: string = ""

 
  constructor(public afAuth: AngularFireAuth, private router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }
  
  async login (){
    const { username, password } = this

    try {

      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
      this.router.navigate(['/menu']);


    } catch (err) {
      console.dir(err);
      this.presentAlert("Ups!!", "Usuario y/o Password Incorrecto")
      console.log("Algo salió mal")
      if(err.code === "auth/user-not-found"){

        this.presentAlert("Ups!!", "Usuario y/o Password Incorrecto")
        console.log("Algo salió mal")
      }
      
      
    }


  }

  goToRegister(){

      this.router.navigate(['/register'])
  

  }


  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['login']);
          }
        }]
    });
    await alert.present();
  }
}
