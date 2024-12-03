package com.crud.prueba.service;

import com.crud.prueba.entity.Invoice;
import com.crud.prueba.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        return  invoiceRepository.findAll();
    }

    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }

    public Invoice createInvoice(Invoice invoice) {
        System.out.println(invoice);
        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Long id, Invoice invoice) {
        Optional<Invoice> existingItem = invoiceRepository.findById(id);

        if (existingItem.isPresent()) {
            Invoice item = existingItem.get();
            item.setCode(invoice.getCode());
            item.setDescription(invoice.getDescription());
            return invoiceRepository.save(item); // Guarda los cambios
        } else {
            throw new RuntimeException("Item no encontrado con ID: " + id);
        }
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
}
