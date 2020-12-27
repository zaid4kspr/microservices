import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceZ } from "./../../../authentification/auth-service.service";
import { SharedService } from "./../../../shared/shared.service";

@Component({
  selector: 'app-business-step-zero',
  templateUrl: './business-step-zero.component.html',
  styleUrls: ['./business-step-zero.component.scss']
})
export class BusinessStepZeroComponent implements OnInit {
  businessForm
  constructor(private fb: FormBuilder, private authService: AuthServiceZ,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.businessForm = this.fb.group({
      nomCommercial: [this.authService?.credentials?.user?.name, Validators.required],
      longitude: ['0', Validators.required],
      latitude: ['0', Validators.required],
      registreCommerce: [''],
      raisonSociale: [''],
      matriculeFiscale: [''],
      contactEmail: [this.authService?.credentials?.user?.email, [Validators.maxLength(50), Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/)]],
      tel: [this.authService?.credentials?.user?.tel, [Validators.minLength(8), Validators.required]],
      website: [''],
      address: [' ', Validators.required],
      createdBy: [this.authService?.credentials?.user?._id, Validators.required],
    });

  }

  ngOnInit(): void {
  }


  personePhysique() {
    var localInfo = JSON.parse(localStorage.getItem('connectedAdmin'))
    
    if (this.businessForm.valid) {
      this.sharedService.addBusiness(this.businessForm.value).then(d => {
        localInfo.user["business"] = d._id
        localStorage.clear()

        localStorage.setItem('connectedAdmin', JSON.stringify(localInfo));

        this.router.navigate(['/business'])

      })
    }
  }

}
