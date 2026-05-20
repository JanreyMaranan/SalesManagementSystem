CREATE OR REPLACE FUNCTION cascade_sales_soft_delete()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.record_status = 'INACTIVE' AND OLD.record_status = 'ACTIVE' THEN
    UPDATE salesdetail
    SET record_status = 'INACTIVE',
        stamp = 'CASCADE-DEL ' || NEW.transno || ' ' || NOW()::text
    WHERE transno = NEW.transno;
  END IF;

  IF NEW.record_status = 'ACTIVE' AND OLD.record_status = 'INACTIVE' THEN
    UPDATE salesdetail
    SET record_status = 'ACTIVE',
        stamp = 'CASCADE-RECOVER ' || NEW.transno || ' ' || NOW()::text
    WHERE transno = NEW.transno;
  END IF;

  RETURN NEW;
END; $$;

CREATE TRIGGER on_sales_status_change
  AFTER UPDATE OF record_status ON sales
  FOR EACH ROW EXECUTE FUNCTION cascade_sales_soft_delete();