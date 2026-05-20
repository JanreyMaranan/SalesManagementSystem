-- View 1: Sales by Customer
CREATE VIEW report_sales_by_customer AS
SELECT c.custno, c.custname,
       COUNT(s.transno) AS total_transactions,
       SUM(sd.quantity * ph.unitprice) AS total_amount
FROM customer c
JOIN sales s ON s.custno = c.custno
LEFT JOIN salesdetail sd ON sd.transno = s.transno AND sd.record_status = 'ACTIVE'
LEFT JOIN (
  SELECT prodcode, unitprice FROM pricehist ph1
  WHERE effdate = (SELECT MAX(effdate) FROM pricehist WHERE prodcode = ph1.prodcode)
) ph ON ph.prodcode = sd.prodcode
WHERE s.record_status = 'ACTIVE'
GROUP BY c.custno, c.custname
ORDER BY total_amount DESC;

-- View 2: Top Products
CREATE VIEW report_top_products AS
SELECT p.prodcode, p.description,
       SUM(sd.quantity) AS total_qty_sold,
       SUM(sd.quantity * ph.unitprice) AS total_revenue
FROM product p
JOIN salesdetail sd ON sd.prodcode = p.prodcode AND sd.record_status = 'ACTIVE'
JOIN (
  SELECT prodcode, unitprice FROM pricehist ph1
  WHERE effdate = (SELECT MAX(effdate) FROM pricehist WHERE prodcode = ph1.prodcode)
) ph ON ph.prodcode = sd.prodcode
GROUP BY p.prodcode, p.description
ORDER BY total_revenue DESC;

-- View 3: Monthly Sales Trend
CREATE VIEW report_monthly_trend AS
SELECT DATE_TRUNC('month', s.salesdate) AS sales_month,
       COUNT(s.transno) AS total_transactions,
       SUM(sd.quantity * ph.unitprice) AS total_amount
FROM sales s
LEFT JOIN salesdetail sd ON sd.transno = s.transno AND sd.record_status = 'ACTIVE'
LEFT JOIN (
  SELECT prodcode, unitprice FROM pricehist ph1
  WHERE effdate = (SELECT MAX(effdate) FROM pricehist WHERE prodcode = ph1.prodcode)
) ph ON ph.prodcode = sd.prodcode
WHERE s.record_status = 'ACTIVE'
GROUP BY DATE_TRUNC('month', s.salesdate)
ORDER BY sales_month DESC;