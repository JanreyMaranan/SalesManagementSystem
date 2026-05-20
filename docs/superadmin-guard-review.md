\# SUPERADMIN Guard Review



\## Summary

UserManagementPage action buttons are disabled for SUPERADMIN rows.

SUPERADMIN accounts cannot be activated or deactivated by any user.



\## Rules Verified

| Rule | Status |

|------|--------|

| SUPERADMIN rows show greyed-out Activate/Deactivate buttons | ✅ |

| Only SUPERADMIN can access Admin page (ADM\_USER right) | ✅ |

| RLS rejects direct UPDATE on SUPERADMIN user record | ✅ |

| Tooltip displayed on hover for disabled SUPERADMIN rows | ✅ |



\## Test Cases

\- Log in as ADMIN → go to /admin → SUPERADMIN row buttons are disabled

\- Log in as USER → /admin redirects or shows Access Denied

\- Attempt direct Supabase UPDATE on SUPERADMIN row → RLS rejects



\## Conclusion

SUPERADMIN guard confirmed working at both UI and database level.

