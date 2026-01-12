import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  registroForm: FormGroup;
  provinciaDetectada: string = '';

  private mapaProvincias: { [key: string]: string } = {
    '01': 'Álava', '02': 'Albacete', '03': 'Alicante', '04': 'Almería', '05': 'Ávila',
    '06': 'Badajoz', '07': 'Islas Baleares', '08': 'Barcelona', '09': 'Burgos', '10': 'Cáceres',
    '11': 'Cádiz', '12': 'Castellón', '13': 'Ciudad Real', '14': 'Córdoba', '15': 'A Coruña',
    '16': 'Cuenca', '17': 'Girona', '18': 'Granada', '19': 'Guadalajara', '20': 'Guipúzcoa',
    '21': 'Huelva', '22': 'Huesca', '23': 'Jaén', '24': 'León', '25': 'Lleida',
    '26': 'La Rioja', '27': 'Lugo', '28': 'Madrid', '29': 'Málaga', '30': 'Murcia',
    '31': 'Navarra', '32': 'Ourense', '33': 'Asturias', '34': 'Palencia', '35': 'Las Palmas',
    '36': 'Pontevedra', '37': 'Salamanca', '38': 'Santa Cruz de Tenerife', '39': 'Cantabria',
    '40': 'Segovia', '41': 'Sevilla', '42': 'Soria', '43': 'Tarragona', '44': 'Teruel',
    '45': 'Toledo', '46': 'Valencia', '47': 'Valladolid', '48': 'Bizkaia', '49': 'Zamora',
    '50': 'Zaragoza', '51': 'Ceuta', '52': 'Melilla'
  };

  constructor(private fb: FormBuilder) {
    console.log('RegistroComponent inicializado');
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      dni: ['', [Validators.required, this.dniValidator]],
      fechaNac: ['', [Validators.required, this.fechaNacimientoValidator]],
      sexo: ['', Validators.required],
      dniFile: [null, [Validators.required, this.fileValidator]], 
      intereses: [[], Validators.required],
      cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      situacion: ['', Validators.required],
      aceptaCondiciones: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.registroForm.get('cp')?.valueChanges.subscribe(valor => {
      this.calcularProvincia(valor);
    });
  }

  calcularProvincia(cp: string) {
    if (cp && cp.length === 5) {
      const codigo = cp.substring(0, 2);
      this.provinciaDetectada = this.mapaProvincias[codigo] || 'No encontrada';
    } else {
      this.provinciaDetectada = '';
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registroForm.patchValue({ dniFile: file });
      this.registroForm.get('dniFile')?.updateValueAndValidity();
    }
  }

  dniValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^[0-9]{8}[A-Z]$/;
    if (!value) return null;
    return regex.test(value) ? null : { dniInvalido: true };
  }

  fechaNacimientoValidator(control: AbstractControl): ValidationErrors | null {
    const fecha = control.value;
    if (!fecha) return null;
    const hoy = new Date();
    const fechaNac = new Date(fecha);
    const añoMinimo = hoy.getFullYear() - 120;
    if (fechaNac > hoy) return { fechaFutura: true };
    if (fechaNac.getFullYear() < añoMinimo) return { muyAntiguo: true };
    return null;
  }

  fileValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file) {
      const isJpg = file.name.toLowerCase().endsWith('.jpg');
      return isJpg ? null : { tipoArchivoInvalido: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registroForm.valid) {
      alert('Registro completado con éxito');
    } else {
      this.registroForm.markAllAsTouched();
      alert('Por favor corrige los errores del formulario');
    }
  }

  get f() { return this.registroForm.controls; }
}
