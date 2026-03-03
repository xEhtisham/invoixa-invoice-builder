import { useState, useMemo, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import InvoiceForm from './components/InvoiceForm';
import LineItemsTable from './components/LineItemsTable';
import InvoicePreview from './components/InvoicePreview';
import {
  calcSubtotal,
  calcDiscountAmount,
  calcTaxAmount,
  calcTotal,
} from './utils/calculations';
import { formatCurrency } from './utils/formatCurrency';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Generate invoice number: INV-YYYY-XXXX
function generateInvoiceNumber() {
  const year = new Date().getFullYear();
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `INV-${year}-${rand}`;
}

// Get today's date in YYYY-MM-DD
function getToday() {
  return new Date().toISOString().split('T')[0];
}

// Get date 30 days from now
function getDueDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

const STORAGE_KEY = 'invoixa_draft';

function loadDraft() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch { }
  return null;
}

export default function App() {
  const draft = loadDraft();

  const [businessName, setBusinessName] = useState(draft?.businessName || '');
  const [businessEmail, setBusinessEmail] = useState(draft?.businessEmail || '');
  const [clientName, setClientName] = useState(draft?.clientName || '');
  const [clientEmail, setClientEmail] = useState(draft?.clientEmail || '');
  const [invoiceNumber] = useState(draft?.invoiceNumber || generateInvoiceNumber());
  const [issueDate, setIssueDate] = useState(draft?.issueDate || getToday());
  const [dueDate, setDueDate] = useState(draft?.dueDate || getDueDate());
  const [currency, setCurrency] = useState(draft?.currency || 'USD');
  const [discount, setDiscount] = useState(draft?.discount || '0');
  const [tax, setTax] = useState(draft?.tax || '10');
  const [notes, setNotes] = useState(
    draft?.notes || 'Payment is due within 30 days. Thanks for your business!'
  );
  const [lineItems, setLineItems] = useState(
    draft?.lineItems || [
      { id: 1, description: 'Premium Subscription Plan', quantity: 1, price: 199 },
      { id: 2, description: 'Custom Design Mockup', quantity: 4, price: 450 },
    ]
  );

  // Computed totals via useMemo
  const subtotal = useMemo(() => calcSubtotal(lineItems), [lineItems]);
  const discountAmount = useMemo(
    () => calcDiscountAmount(subtotal, discount),
    [subtotal, discount]
  );
  const taxAmount = useMemo(
    () => calcTaxAmount(subtotal - discountAmount, tax),
    [subtotal, discountAmount, tax]
  );
  const total = useMemo(
    () => calcTotal(subtotal, discountAmount, taxAmount),
    [subtotal, discountAmount, taxAmount]
  );

  // Currency formatting helper
  const formatAmount = useCallback(
    (amount) => formatCurrency(amount, currency),
    [currency]
  );

  // Save draft to LocalStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = {
        businessName,
        businessEmail,
        clientName,
        clientEmail,
        invoiceNumber,
        issueDate,
        dueDate,
        currency,
        discount,
        tax,
        notes,
        lineItems,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 500);
    return () => clearTimeout(timer);
  }, [
    businessName, businessEmail, clientName, clientEmail,
    invoiceNumber, issueDate, dueDate, currency, discount,
    tax, notes, lineItems,
  ]);

  // New Invoice handler
  const handleNewInvoice = () => {
    setBusinessName('');
    setBusinessEmail('');
    setClientName('');
    setClientEmail('');
    setIssueDate(getToday());
    setDueDate(getDueDate());
    setDiscount('0');
    setTax('10');
    setNotes('Payment is due within 30 days. Thanks for your business!');
    setLineItems([{ id: Date.now(), description: '', quantity: 1, price: 0 }]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // PDF Download handler
  const handleDownloadPDF = async () => {
    const element = document.getElementById('invoice-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoiceNumber}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  // Static summary values (demo data)
  const paidAmount = 8320;
  const pendingAmount = 4130;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onNewInvoice={handleNewInvoice} onDownloadPDF={handleDownloadPDF} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Summary Cards */}
        <div className="mb-8">
          <SummaryCards
            subtotal={12450}
            paid={paidAmount}
            pending={pendingAmount}
            currency={currency}
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form (60%) */}
          <div className="lg:col-span-3 space-y-5">
            <InvoiceForm
              businessName={businessName}
              setBusinessName={setBusinessName}
              businessEmail={businessEmail}
              setBusinessEmail={setBusinessEmail}
              clientName={clientName}
              setClientName={setClientName}
              clientEmail={clientEmail}
              setClientEmail={setClientEmail}
              invoiceNumber={invoiceNumber}
              issueDate={issueDate}
              setIssueDate={setIssueDate}
              dueDate={dueDate}
              setDueDate={setDueDate}
              currency={currency}
              setCurrency={setCurrency}
              discount={discount}
              setDiscount={setDiscount}
              tax={tax}
              setTax={setTax}
              notes={notes}
              setNotes={setNotes}
              subtotal={subtotal}
              discountAmount={discountAmount}
              taxAmount={taxAmount}
              total={total}
              formatAmount={formatAmount}
            />

            <LineItemsTable
              lineItems={lineItems}
              setLineItems={setLineItems}
              formatAmount={formatAmount}
            />
          </div>

          {/* Right Column: Preview (40%) */}
          <div className="lg:col-span-2 lg:sticky lg:top-20">
            <InvoicePreview
              businessName={businessName}
              businessEmail={businessEmail}
              clientName={clientName}
              clientEmail={clientEmail}
              invoiceNumber={invoiceNumber}
              issueDate={issueDate}
              dueDate={dueDate}
              lineItems={lineItems}
              subtotal={subtotal}
              discountAmount={discountAmount}
              discount={discount}
              taxAmount={taxAmount}
              tax={tax}
              total={total}
              notes={notes}
              formatAmount={formatAmount}
              onDownloadPDF={handleDownloadPDF}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
