import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../../services/invoice/invoice.service';
import {Invoice} from '../../models/invoice.model';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  imports: [FormsModule, NgForOf],
  standalone: true,
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

  invoices: Invoice[] = [];
  idInvoice: number | undefined
  invoice: Invoice = {
    code: '',
    description: ''
  };

  isEdit: boolean = false;

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getAll().subscribe((data) => {
      this.invoices = data
    })
  }

  edit(id: number | undefined): void {
    this.isEdit = true

    this.invoiceService.getById(id).subscribe((data) => {
      this.invoice = data;
      this.idInvoice = data.id
    })

  }

  createOrUpdate(): void {

    if (this.isEdit) {
      this.invoiceService.update(this.idInvoice, this.invoice).subscribe(() => {
        alert(`Factura actualizada`)
        this.isEdit = false;
        this.loadInvoices()
      });
    } else {
      this.invoiceService.create(this.invoice).subscribe(() => {
        alert(`Factura creada`)
        this.loadInvoices()
      });
    }

    this.invoice = {id: 0, code: '', description: ''}


  }

  deleteItem(id: number | undefined): void {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      this.invoiceService.delete(id).subscribe(() => this.loadInvoices());
    }
  }

}
