import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup =  this.fb.group({
    name:      ['Test 4', [Validators.required, Validators.minLength(5)]],
    email:     ['test@test.com', [Validators.required, Validators.email] ],
    password:  ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);

    this.router.navigateByUrl('/dashboard');


    const {name, email, password} = this.miFormulario.value;
    this.authService.registro(name, email, password)
        .subscribe(resp => {
          console.log('respuesta',resp);
          if(resp === true){
            this.router.navigateByUrl('/dashboard');
          }else{
            //mensaje de error
            Swal.fire('Error', resp, 'error');
          }
        })
    
  }

}
