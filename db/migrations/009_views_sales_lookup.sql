CREATE VIEW sales_with_lookup AS
SELECT s.transno, s.salesdate, s.record_status, s.stamp,
       s.custno, c.custname, c.payterm,
       s.empno, e.lastname || ', ' || e.firstname AS empname,
       COUNT(sd.prodcode) AS lineitemcount,
       SUM(sd.quantity * ph.unitprice) AS totalamount
FROM sales s
JOIN customer c ON c.custno = s.custno
JOIN employee e ON e.empno = s.empno
LEFT JOIN salesdetail sd ON sd.transno = s.transno AND sd.record_status = 'ACTIVE'
LEFT JOIN (
  SELECT prodcode, unitprice FROM pricehist ph1
  WHERE effdate = (SELECT MAX(effdate) FROM pricehist WHERE prodcode = ph1.prodcode)
) ph ON ph.prodcode = sd.prodcode
GROUP BY s.transno, s.salesdate, s.record_status, s.stamp,
         s.custno, c.custname, c.payterm, s.empno, e.lastname, e.firstname
ORDER BY s.salesdate DESC;

CREATE VIEW salesdetail_with_product AS
SELECT sd.transno, sd.prodcode, sd.quantity,
       sd.record_status, sd.stamp,
       p.description AS proddesc, p.unit,
       ph.unitprice,
       sd.quantity * ph.unitprice AS rowtotal
FROM salesdetail sd
JOIN product p ON p.prodcode = sd.prodcode
JOIN (
  SELECT prodcode, unitprice FROM pricehist ph1
  WHERE effdate = (SELECT MAX(effdate) FROM pricehist WHERE prodcode = ph1.prodcode)
) ph ON ph.prodcode = sd.prodcode;