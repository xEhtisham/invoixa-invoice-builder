Invoixa — React Invoice Engine

A modern invoice builder web application built with React that allows users to create professional invoices with real-time calculations and live preview synchronization.

The application focuses on clean UI, accurate financial calculations, and responsive design to simulate a real SaaS invoicing workflow.

Live Demo:
https://invoixapro.vercel.app

Features

• Real-time invoice calculations (subtotal, tax, discount, total)
• Dynamic line item management (add / remove / edit items)
• Live invoice preview that updates instantly
• Multi-currency formatting support
• Automatic invoice ID generation
• Local draft persistence using browser storage
• Fully responsive layout for desktop and mobile
• Clean SaaS-style interface built with Tailwind CSS

Tech Stack

Frontend
• React
• Tailwind CSS

Core Logic
• React Hooks (useState, useMemo)
• LocalStorage for draft persistence

Utilities
• Currency formatting using Intl.NumberFormat
• Modular calculation engine

The architecture separates UI components, business logic, and utilities to maintain clean and scalable code.

Key Functionality
Dynamic Line Items
Users can add, edit, and remove invoice items while the system automatically recalculates totals.
Live Preview Engine
The invoice preview reflects form changes instantly without page reload.
Calculation Engine
All financial calculations are handled through a centralized utility module to ensure accuracy.
