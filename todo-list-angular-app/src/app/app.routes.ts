import { Routes } from '@angular/router';
import {InvoiceComponent} from './components/invoice/invoice.component';

export const routes: Routes = [
  {
    path: 'list-invoices',
    component: InvoiceComponent,
  },
  {
    path: '',
    redirectTo: '/list-invoices',
    pathMatch: 'full'
  }
];
