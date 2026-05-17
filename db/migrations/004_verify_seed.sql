SELECT 'sales' AS table_name, COUNT(*) AS row_count FROM sales
UNION ALL
SELECT 'salesDetail', COUNT(*) FROM salesDetail
UNION ALL
SELECT 'customer', COUNT(*) FROM customer
UNION ALL
SELECT 'employee', COUNT(*) FROM employee
UNION ALL
SELECT 'product', COUNT(*) FROM product
UNION ALL
SELECT 'priceHist', COUNT(*) FROM priceHist;

SELECT sd.transNo
FROM salesDetail sd
LEFT JOIN sales s ON s.transNo = sd.transNo
WHERE s.transNo IS NULL;

SELECT transNo, record_status, stamp
FROM sales
LIMIT 5;

SELECT transNo, prodCode, record_status, stamp
FROM salesDetail
LIMIT 5;
