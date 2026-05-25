ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY sales_visibility ON sales FOR SELECT TO authenticated
USING (
  record_status = 'ACTIVE'
  OR EXISTS (
    SELECT 1 FROM public."user"
    WHERE "userId" = auth.uid()::text
    AND user_type IN ('ADMIN','SUPERADMIN')
  )
);

CREATE POLICY sales_insert ON sales FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights" umr
    WHERE umr.userid = auth.uid()::text
    AND umr.rightCode = 'SALES_ADD'
    AND umr.right_value = 1
  )
);

CREATE POLICY sales_update ON sales FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights" umr
    WHERE umr.userid = auth.uid()::text
    AND umr.rightCode = 'SALES_EDIT'
    AND umr.right_value = 1
  )
);

CREATE POLICY sales_softdelete ON sales FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights" umr
    WHERE umr.userid = auth.uid()::text
    AND umr.rightCode = 'SALES_DEL'
    AND umr.right_value = 1
  )
);