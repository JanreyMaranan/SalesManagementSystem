\# Hope Inc. SMS — User Manual v2.0



\## Overview

The Hope Inc. Sales Management System (SMS) is a web-based application

for managing sales transactions, customer records, and employee data.

Built with React + Vite + Supabase.



\## Accessing the System

1\. Go to the live URL (Vercel deployment)

2\. Login with email/password OR Google account

3\. New accounts start as INACTIVE — contact SUPERADMIN to activate



\## User Roles \& Permissions



| Feature | USER | ADMIN | SUPERADMIN |

|---------|------|-------|------------|

| View Sales | ✅ | ✅ | ✅ |

| Add Sale | ❌ | ✅ | ✅ |

| Edit Sale | ❌ | ✅ | ✅ |

| Delete Sale | ❌ | ✅ | ✅ |

| View Lookups | ✅ | ✅ | ✅ |

| View Reports | ✅ | ✅ | ✅ |

| View Deleted Items | ❌ | ✅ | ✅ |

| Manage Users | ❌ | ❌ | ✅ |



\## Module Guide



\### Sales List (/sales)

\- View all active sales transactions

\- ADMIN: Click Add Transaction to create new sale

\- Click any row to view Sales Detail

\- ADMIN: Edit or Delete buttons per row



\### Sales Detail (/sales/:transNo)

\- View all line items for a transaction

\- ADMIN: Add, Edit, Delete line items



\### Lookups

\- \*\*/lookups/customers\*\* — Customer list (read-only)

\- \*\*/lookups/employees\*\* — Employee list (read-only)

\- \*\*/lookups/products\*\* — Product list (read-only)

\- \*\*/lookups/prices\*\* — Price history (read-only)



\### Reports (/reports)

\- Sales by Customer — total transactions and spend per customer

\- Top Products — best selling products by revenue

\- Monthly Trend — transaction count and revenue by month



\### Admin (/admin) — SUPERADMIN only

\- View all registered users

\- Activate pending accounts

\- Deactivate existing accounts

\- SUPERADMIN rows are protected and cannot be modified



\### Deleted Items (/deleted-items) — ADMIN/SUPERADMIN only

\- View all soft-deleted sales and details

\- Click Recover to restore deleted records



\## Troubleshooting

| Issue | Solution |

|-------|----------|

| Can't login | Check email/password or contact SUPERADMIN |

| Buttons not showing | Your account may not have the required rights |

| Page shows Access Denied | Your role doesn't have permission for this module |

