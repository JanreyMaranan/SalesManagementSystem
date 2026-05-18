ALTER TABLE salesDetail ENABLE ROW LEVEL SECURITY;

CREATE POLICY salesdetail_visibility ON salesDetail FOR SELECT TO authenticated
USING (
  record_status = 'ACTIVE'
  OR EXISTS (
    SELECT 1 FROM public."user"
    WHERE "userId" = auth.uid()::text
    AND user_type IN ('ADMIN','SUPERADMIN')
  )
);

CREATE POLICY salesdetail_insert ON salesDetail FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights" umr
    WHERE umr.userid = auth.uid()::text
    AND umr.rightCode = 'SD_ADD'
    AND umr.right_value = 1
  )
);

CREATE POLICY salesdetail_update ON salesDetail FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights" umr
    WHERE umr.userid = auth.uid()::text
    AND umr.rightCode = 'SD_EDIT'
    AND umr.right_value = 1
  )
);

CREATE POLICY salesdetail_softdelete ON salesDetail FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights" umr
    WHERE umr.userid = auth.uid()::text
    AND umr.rightCode = 'SD_DEL'
    AND umr.right_value = 1
  )
);