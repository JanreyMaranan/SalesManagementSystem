CREATE OR REPLACE FUNCTION provision_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."user" (userid, username, user_type, record_status)
  VALUES (
    NEW.id::text,
    NEW.email,
    'USER',
    'INACTIVE'
  );

  INSERT INTO public."UserModule_Rights" (userid, rightCode, right_value)
  VALUES
    (NEW.id::text, 'SALES_VIEW', 1),
    (NEW.id::text, 'SALES_ADD', 0),
    (NEW.id::text, 'SALES_EDIT', 0),
    (NEW.id::text, 'SALES_DEL', 0),
    (NEW.id::text, 'SD_VIEW', 1),
    (NEW.id::text, 'SD_ADD', 0),
    (NEW.id::text, 'SD_EDIT', 0),
    (NEW.id::text, 'SD_DEL', 0),
    (NEW.id::text, 'CUST_LOOKUP', 1),
    (NEW.id::text, 'EMP_LOOKUP', 1),
    (NEW.id::text, 'PROD_LOOKUP', 1),
    (NEW.id::text, 'PRICE_LOOKUP', 1),
    (NEW.id::text, 'ADM_USER', 0);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION provision_new_user();