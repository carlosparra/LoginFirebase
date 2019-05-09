import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  username: string = ""
  password: string = ""
  cpassword: string = ""


  constructor(public afAuth: AngularFireAuth, public router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }


  async register(){
     const{username, password, cpassword} = this
     if(password !== cpassword){

          return console.error("El password no coincide")
     }

     try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password)
      this.presentAlert("Éxito", "Los datos se guardaron correctamente")
      console.log(res)


     } catch (error) {
      console.dir(error)

     }
    
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }]
    });
    await alert.present();
  }


}
