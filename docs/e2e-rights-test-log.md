\# End-to-End Rights Production Test Log



\## Test Date: May 2025

\## Tester: bernardlorenzo (M4 - Rights \& Auth Specialist)



\## User Types Tested

| User Type | Login | Sales View | Sales Add | Sales Edit | Sales Del | Admin Access |

|-----------|-------|------------|-----------|------------|-----------|--------------|

| USER (Sales Agent) | ✅ | ✅ | ❌ Hidden | ❌ Hidden | ❌ Hidden | ❌ Hidden |

| ADMIN (Sales Manager) | ✅ | ✅ | ✅ Visible | ✅ Visible | ✅ Visible | ✅ Visible |

| SUPERADMIN | ✅ | ✅ | ✅ Visible | ✅ Visible | ✅ Visible | ✅ Visible |



\## Rights Verified (13 Total)

| Right Code | USER | ADMIN | SUPERADMIN |

|------------|------|-------|------------|

| SALES\_VIEW | 1 | 1 | 1 |

| SALES\_ADD | 0 | 1 | 1 |

| SALES\_EDIT | 0 | 1 | 1 |

| SALES\_DEL | 0 | 1 | 1 |

| SD\_VIEW | 1 | 1 | 1 |

| SD\_ADD | 0 | 1 | 1 |

| SD\_EDIT | 0 | 1 | 1 |

| SD\_DEL | 0 | 1 | 1 |

| CUST\_LOOKUP | 1 | 1 | 1 |

| EMP\_LOOKUP | 1 | 1 | 1 |

| PROD\_LOOKUP | 1 | 1 | 1 |

| PRICE\_LOOKUP | 1 | 1 | 1 |

| ADM\_USER | 0 | 0 | 1 |



\## Google OAuth Test

\- Google sign-in tested in production ✅

\- Redirects to /sales on success ✅

\- Inactive account redirects to /login?error=not\_activated ✅



\## Conclusion

All 13 rights verified across all 3 user types in production.

