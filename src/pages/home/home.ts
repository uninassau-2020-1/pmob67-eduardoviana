import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ViacepProvider} from '../../providers/viacep/viacep';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {








	
	private cep;
	private endereco:any = {};
	vazio = "";
	formGroup: FormGroup;

	constructor(public navCtrl: NavController, 
				private viacep: ViacepProvider,
				private alertController: AlertController,
				public formBuilder: FormBuilder
	) {
		this.formGroup = this.formBuilder.group({
			cep: [null, [Validators.required]]
		})
	}
	
	getEndereco(){
		if (this.cep == null || this.cep.length == 0) {	
			this.alertNulo();
		} 
		else if (this.cep.length != 8) {
			this.alertInvalido2();
			this.formGroup.reset(this.cep);
			} else
			this.viacep.callService(this.cep).subscribe(
			data =>{
				if ("erro" in data) {
					this.alertInvalido();
				}	
				this.endereco = data;
				console.log(data);
        }
      );
	}

	alertInvalido() {
		let alert = this.alertController.create({
		  title: 'CEP INEXISTENTE:',
		  subTitle: 'CEP Inexistente',
		  buttons: ['OK']
		});
		alert.present();
	  }
	
	  alertInvalido2() {
		let alert = this.alertController.create({
		  title: 'CEP INEXISTENTE:',
		  subTitle: 'Digite um CEP com 8 Digitos',
		  buttons: ['OK']
		});
		alert.present();
	  }
	
	  alertNulo() {
		let alert = this.alertController.create({
		  title: 'DIGITAR CEP:',
		  subTitle: 'Digite um CEP',
		  buttons: ['OK']
		});
		alert.present();
	  }    
}
