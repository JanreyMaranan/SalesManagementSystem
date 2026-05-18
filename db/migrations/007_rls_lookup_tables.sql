ALTER TABLE customer ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee ENABLE ROW LEVEL SECURITY;
ALTER TABLE product ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricehist ENABLE ROW LEVEL SECURITY;

CREATE POLICY customer_lookup ON customer FOR SELECT TO authenticated USING (true);
CREATE POLICY employee_lookup ON employee FOR SELECT TO authenticated USING (true);
CREATE POLICY product_lookup ON product FOR SELECT TO authenticated USING (true);
CREATE POLICY pricehist_lookup ON pricehist FOR SELECT TO authenticated USING (true);