\# Test Cases — Hope Inc. SMS



\## Sprint 1 Test Cases



| TC# | Module | Test Case | Expected Result | Status |

|-----|--------|-----------|-----------------|--------|

| TC01 | Auth | Login with valid email/password | Redirects to /sales | ✅ Pass |

| TC02 | Auth | Login with invalid password | Shows error message | ✅ Pass |

| TC03 | Auth | Login with inactive account | Redirects to /login?error=not\_activated | ✅ Pass |

| TC04 | Auth | Register new account | Creates USER/INACTIVE record | ✅ Pass |

| TC05 | Auth | Google OAuth login | Redirects to /sales | ✅ Pass |

| TC06 | Auth | Access /sales without login | Redirects to /login | ✅ Pass |

| TC07 | Rights | USER sees no Add button | Add button hidden | ✅ Pass |

| TC08 | Rights | ADMIN sees Add button | Add button visible | ✅ Pass |

| TC09 | Rights | USER sees no Delete button | Delete button hidden | ✅ Pass |

| TC10 | Rights | ADMIN sees Delete button | Delete button visible | ✅ Pass |

| TC11 | Sales | View sales list | Shows all active sales | ✅ Pass |

| TC12 | Sales | Add new sale | Sale created with ACTIVE status | ✅ Pass |

| TC13 | Sales | Edit existing sale | Sale updated successfully | ✅ Pass |

| TC14 | Sales | Soft delete sale | Sale marked INACTIVE | ✅ Pass |

| TC15 | Sales | Recover deleted sale | Sale marked ACTIVE again | ✅ Pass |

| TC16 | SalesDetail | Add line item | Detail created with ACTIVE status | ✅ Pass |

| TC17 | SalesDetail | Edit line item | Detail updated successfully | ✅ Pass |

| TC18 | SalesDetail | Delete line item | Detail marked INACTIVE | ✅ Pass |

| TC19 | Lookup | View customers list | Shows all customers | ✅ Pass |

| TC20 | Lookup | View employees list | Shows all employees | ✅ Pass |

| TC21 | Lookup | View products list | Shows all products | ✅ Pass |

| TC22 | Lookup | View price history | Shows all prices | ✅ Pass |

| TC23 | Reports | View sales by customer | Shows customer totals | ✅ Pass |

| TC24 | Reports | View top products | Shows product revenue | ✅ Pass |

| TC25 | Reports | View monthly trend | Shows monthly totals | ✅ Pass |

| TC26 | Admin | SUPERADMIN views user list | Shows all users | ✅ Pass |

| TC27 | Admin | SUPERADMIN activates user | User status → ACTIVE | ✅ Pass |

| TC28 | Admin | SUPERADMIN deactivates user | User status → INACTIVE | ✅ Pass |

| TC29 | Admin | USER accesses /admin | Access denied | ✅ Pass |

| TC30 | RLS | USER tries to delete sale directly | RLS rejects operation | ✅ Pass |

| TC31 | RLS | ADMIN soft deletes sale | Cascade triggers on salesDetail | ✅ Pass |

| TC32 | RLS | UPDATE on SUPERADMIN record | RLS rejects operation | ✅ Pass |

| TC33 | Sidebar | USER sees no Admin link | Admin link hidden | ✅ Pass |

| TC34 | Sidebar | USER sees no Deleted Items link | Deleted Items hidden | ✅ Pass |

| TC35 | Sidebar | SUPERADMIN sees all links | All links visible | ✅ Pass |

| TC36 | DB | New user registration trigger | 13 rights seeded automatically | ✅ Pass |

| TC37 | DB | Soft delete cascade | salesDetail rows marked INACTIVE | ✅ Pass |

| TC38 | DB | Recover cascade | salesDetail rows marked ACTIVE | ✅ Pass |

| TC39 | DB | Report views return data | All 3 report views return rows | ✅ Pass |

