\# RLS Audit Document



\## Sprint 2 \& 3 — Row Level Security Summary



| Table | RLS Enabled | Policies | Notes |

|-------|-------------|----------|-------|

| sales | YES | sales\_visibility, sales\_insert, sales\_update, sales\_softdelete | 4 policies |

| salesDetail | YES | salesdetail\_visibility, salesdetail\_insert, salesdetail\_update, salesdetail\_softdelete | 4 policies |

| customer | YES | customer\_lookup | SELECT only |

| employee | YES | employee\_lookup | SELECT only |

| product | YES | product\_lookup | SELECT only |

| pricehist | YES | pricehist\_lookup | SELECT only |

| user | YES | user\_superadmin\_only | SUPERADMIN only |

| UserModule\_Rights | YES | umr\_superadmin\_only | SUPERADMIN only |



\## Rules Applied

\- No DELETE keyword used anywhere

\- Soft delete only via record\_status = 'INACTIVE'

\- Lookup tables are READ-ONLY (SELECT only)

\- SUPERADMIN has full access to all tables

