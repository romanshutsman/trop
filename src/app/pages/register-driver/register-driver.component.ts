import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, NgForm  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from './../../services/shared.service';
import * as firebase from 'firebase';
declare var $: any;

@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.component.html',
  styleUrls: ['./register-driver.component.scss']
})
export class RegisterDriverComponent implements OnInit {
  selected = '';
  registerDriver: FormGroup;
  registerDetails: FormGroup;
  uploadImages: FormGroup;
  subscDriver: Subscription;
  provincia = [
    'Ciudad Autónoma de Buenos Aires',
    'Buenos Aires',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santa Fe',
    'Santiago del Estero',
    'Terra do Fogo',
    'Tucumán'
  ];
  userInfo;
  validCbu = false;
  showHeader = true;
  personal = [];
  vehicle = [];
  license = [];
  services = ['automotores', 'mudanza', 'maquinaria', 'objetos', 'mascotas', 'motocicleta', 'muebles', 'otros'];
  constructor(private service:   SharedService, private fb: FormBuilder, private router: Router) {
    this.validationFormDriver();
    this.validationDetails();
    this.validationImage();
  }
  
  ngOnInit() {
    this.subscDriver = this.service.fillDriverForm.subscribe((data) => this.fillform(data));
  }
  validationFormDriver() {
    const nameFormat = '[a-zA-Z ]*';
    const phoneFormat = '[0-9]';
    this.registerDriver = new FormGroup({
      // 'name': new FormControl(null, [
      //   Validators.required,
      //   Validators.maxLength(50),
      //   Validators.minLength(5),
      //   Validators.pattern(nameFormat)
      //   ]),
      // 'email': new FormControl(null, [Validators.required, Validators.email]),
      // 'phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
      // 'provincia': new FormControl(null, [Validators.required ]),
      // 'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      'alternateNumber': new FormControl(null, [ Validators.minLength(10), Validators.maxLength(13)]),
      'description': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(1200)]),
      'automotores': new FormControl(false),
      'mudanza': new FormControl(false),
      'maquinaria': new FormControl(false),
      'objetos': new FormControl(false),
      'mascotas': new FormControl(false),
      'motocicleta': new FormControl(false),
      'muebles': new FormControl(false),
      'otros': new FormControl(false),
      'otrosText': new FormControl(null, [Validators.minLength(2), Validators.maxLength(100)])
    }, this.validationCheckbox);
  }
  validationCheckbox(g: FormGroup) {
    return g.get('automotores').value
    || g.get('mudanza').value
    || g.get('maquinaria').value
    || g.get('objetos').value
    || g.get('mascotas').value
    || g.get('motocicleta').value
    || g.get('muebles').value
    || (g.get('otros').value && g.get('otrosText').value)
    ? null : {'mismatch': true};
  }
  validationDetails() {
    this.registerDetails = new FormGroup({
      'cbu': new FormControl(null, [Validators.required, Validators.maxLength(22), Validators.minLength(22)]),
      'repeatCbu': new FormControl(null, [Validators.required, , Validators.minLength(22), Validators.maxLength(22)]),
      'cuil': new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      'bank': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
    }, this.cbuRepeat);
  }
  validationImage() {
    this.personal = [];
    this.vehicle = [];
    this.license = [];
    this.uploadImages = new FormGroup({
      'personal': new FormControl(null),
      'vehicle': new FormControl(null),
      'license': new FormControl(null)
    });
  }
  cbuRepeat(g: FormGroup) {
    return g.get('cbu').value === g.get('repeatCbu').value
    ? null : {'mismatch': true};
  }
  validationNumber(event: any) {
    const pattern = /[0-9\+\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  validationCuilCbu(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  submit1() {
    $('[href="#buzz"]').tab('show');
  }
  submit2() {
    $('[href="#references"]').tab('show');
  }
  valueProgressBar(percent) {
    if (percent == 100) {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
    const width = 'width:' + percent + '%';
    const progress = document.getElementById('progress');
    progress.setAttribute('style', width);
  }
  onSubmitDriver() {
    const data = this.registerDriver.value;
    console.log(data);
    this.updateDriverProfile(data);
    this.valueProgressBar(66);
  }
  onSubmitDetails() {
    this.valueProgressBar(100);
    const data = this.registerDetails.value;
    const dataDetails = {};
    dataDetails['bank'] = data.bank;
    dataDetails['cbu'] = data.cbu;
    dataDetails['cuil'] = data.cuil;
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    if (uid) {
      firebase.database().ref('drivers/' + uid).update(dataDetails);
    }
  }
  onSubmitImage() {
    const uid = firebase.auth().currentUser.uid;
    if (this.personal.length != 0) {
      this.putImgPersonal(uid);
    }
    if (this.vehicle.length != 0) {
      this.putImgVehicle(uid);
    }
    if (this.license.length != 0) {
      this.putImgLicense(uid);
    }
    this.router.navigateByUrl('/orders-for-drivers');
  }
  putImgPersonal(uid) {
    let photoURL = [];
    this.personal.forEach((img, i) => {
      const namePhoto = this.getnameOfImages();
      const ref = firebase.storage().ref().child('drivers/' + uid + '/personal/' + namePhoto).put(img.file);
      ref.on('state_changed', () => {
      }, (error) => {
      }, () => {
        const downloadURL = ref.snapshot.downloadURL;
        this.personal.splice(i, 1);
        photoURL.push(downloadURL);
        const photo = {};
        photo[0] = photoURL[0];
        firebase.database().ref('/drivers/' + uid + '/personal/').set(photo);
      });
    });
    this.personal = [];
    photoURL = [];
  }
  putImgVehicle(uid) {
    let photoURL = [];
    this.vehicle.forEach((img, i) => {
      const namePhoto = this.getnameOfImages();
      const ref = firebase.storage().ref().child('drivers/' + uid +  '/vehicle/' + namePhoto).put(img.file);
      ref.on('state_changed', () => {
      }, (error) => {
      }, () => {
        const downloadURL = ref.snapshot.downloadURL;
        this.vehicle.splice(i, 1);
        photoURL.push(downloadURL);
        const photo = {};
        photo[0] = photoURL[0];
        if (photoURL.length == 2) {
          photo[1] = photoURL[1];
        }
        firebase.database().ref('/drivers/' + uid + '/vehicle/').set(photo);
      });
    });
    this.vehicle = [];
    photoURL = [];
  }
  putImgLicense(uid) {
    let photoURL = [];
    this.license.forEach((img, i) => {
      const namePhoto = this.getnameOfImages();
      const ref = firebase.storage().ref().child('drivers/' + uid +  '/license/' + namePhoto).put(img.file);
      ref.on('state_changed', () => {
      }, (error) => {
      }, () => {
        const downloadURL = ref.snapshot.downloadURL;
        this.license.splice(i, 1);
        photoURL.push(downloadURL);
        const photo = {};
        photo[0] = photoURL[0];
        if (photoURL.length == 2) {
          photo[1] = photoURL[1];
        }
        firebase.database().ref('/drivers/' + uid + '/license/').set(photo);
      });
    });
    this.license = [];
    photoURL = [];
  }
  getnameOfImages() {
    const date = new Date().getTime();
    const number = Math.random();
    const number17 = number * 100000000000000000;
    const numberStr = number17.toString();
    const num13 = numberStr.substring(0, 13);
    const namePhoto = +num13 + 1530870672397;
    let namePhoto13 =  namePhoto.toString();
    namePhoto13 =  namePhoto13.substring(0, 13);
    return namePhoto13;
  }
  updateDriverProfile(data) {
    console.log(this.userInfo);
    const dataDriver = {};
    dataDriver['email'] = this.userInfo.email;
    dataDriver['name'] = this.userInfo.name;
    dataDriver['phone'] = this.userInfo.phone;
    dataDriver['provincia'] = this.userInfo.provincia;
    if (data.description) {
      dataDriver['description'] = data.description;
    }
    if (data.automotores
    || data.mudanza
    || data.maquinaria
    || data.objetos
    || data.mascotas
    || data.motocicleta
    || data.muebles
    || data.otros) {
      dataDriver['services'] = {};
      dataDriver['services']['automotores'] = data.automotores;
      dataDriver['services']['mudanza'] = data.mudanza;
      dataDriver['services']['maquinaria'] = data.maquinaria;
      dataDriver['services']['objetos'] = data.objetos;
      dataDriver['services']['mascotas'] = data.mascotas;
      dataDriver['services']['motocicleta'] = data.motocicleta;
      dataDriver['services']['muebles'] = data.muebles;
      dataDriver['services']['otros'] = data.otros;
    }
    if (data.otros && data.otrosText) {
      dataDriver['otrosText'] = data.otrosText;
    }
    const user = firebase.auth().currentUser;
    if (user) {
      const uid = user.uid;
      console.log(uid);
      console.log(dataDriver);
      firebase.database().ref('drivers/' + uid).update(dataDriver);
    }
  }
  fillform(data) {
    console.log(data);
    this.userInfo = data;
    this.updateDriverProfile(data);
    // this.registerDriver.patchValue(data);
  }
  onAddPersonal(event) {
    const file = event.srcElement.files;
    if (file[0]) {
      if (file[0].size <= 10485760) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const url = e.target.result;
            this.personal.push({url: url, file: file[0]});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      } else {
        alert('File size must be less than 10MB.');
      }
    }
  }
  onAddVehicle(event) {
    const file = event.srcElement.files;
    if (file[0]) {
      if (file[0].size <= 10485760) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const url = e.target.result;
            this.vehicle.push({url: url, file: file[0]});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      } else {
        alert('File size must be less than 10MB.');
      }
    }
  }
  onAddLicense(event) {
    const file = event.srcElement.files;
    if (file[0]) {
      if (file[0].size <= 10485760) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const url = e.target.result;
            this.license.push({url: url, file: file[0]});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      } else {
        alert('File size must be less than 10MB.');
      }
    }
  }
}
