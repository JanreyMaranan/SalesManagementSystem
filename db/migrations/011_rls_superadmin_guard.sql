-- Enable RLS on user table
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on UserModule_Rights table
ALTER TABLE "UserModule_Rights" ENABLE ROW LEVEL SECURITY;

-- SUPERADMIN guard: only SUPERADMIN can see all users
CREATE POLICY user_superadmin_only ON "user" FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public."user"
    WHERE userid = auth.uid()::text
    AND user_type = 'SUPERADMIN'
  )
);

-- SUPERADMIN guard: only SUPERADMIN can manage UserModule_Rights
CREATE POLICY umr_superadmin_only ON "UserModule_Rights" FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public."user"
    WHERE userid = auth.uid()::text
    AND user_type = 'SUPERADMIN'
  )
);