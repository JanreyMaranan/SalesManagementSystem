CREATE TABLE "user" (
  userId VARCHAR(20) NOT NULL PRIMARY KEY,
  username VARCHAR(30),
  email VARCHAR(50),
  user_type VARCHAR(15),
  record_status VARCHAR(10) DEFAULT 'INACTIVE',
  stamp VARCHAR(60)
);

CREATE TABLE "Module" (
  moduleCode VARCHAR(20) NOT NULL PRIMARY KEY,
  moduleName VARCHAR(30),
  record_status VARCHAR(10),
  stamp VARCHAR(60)
);

CREATE TABLE rights (
  rightCode VARCHAR(20) NOT NULL PRIMARY KEY,
  rightDesc VARCHAR(50),
  right_value INT DEFAULT 0,
  moduleCode VARCHAR(20) REFERENCES "Module",
  record_status VARCHAR(10),
  stamp VARCHAR(60)
);

CREATE TABLE user_module (
  userId VARCHAR(20) REFERENCES "user",
  moduleCode VARCHAR(20) REFERENCES "Module",
  rights_value INT DEFAULT 0,
  PRIMARY KEY (userId, moduleCode)
);

CREATE TABLE "UserModule_Rights" (
  userid VARCHAR(20) REFERENCES "user",
  rightCode VARCHAR(20) REFERENCES rights,
  right_value INT DEFAULT 0,
  PRIMARY KEY (userid, rightCode)
);

INSERT INTO "Module" VALUES ('Sales_Mod','Sales Module','ACTIVE','SEEDED');
INSERT INTO "Module" VALUES ('SD_Mod','Sales Detail Module','ACTIVE','SEEDED');
INSERT INTO "Module" VALUES ('Lookup_Mod','Lookup Module','ACTIVE','SEEDED');
INSERT INTO "Module" VALUES ('Adm_Mod','Admin Module','ACTIVE','SEEDED');

INSERT INTO rights VALUES ('SALES_VIEW','View Transactions',1,'Sales_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('SALES_ADD','Create Transaction',1,'Sales_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('SALES_EDIT','Edit Transaction',1,'Sales_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('SALES_DEL','Soft Delete Transaction',1,'Sales_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('SD_VIEW','View Sales Detail',1,'SD_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('SD_ADD','Add Line Item',1,'SD_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('SD_EDIT','Edit Line Item',1,'SD_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('SD_DEL','Soft Delete Line Item',1,'SD_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('CUST_LOOKUP','Look Up Customers',1,'Lookup_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('EMP_LOOKUP','Look Up Employees',1,'Lookup_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('PROD_LOOKUP','Look Up Products',1,'Lookup_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('PRICE_LOOKUP','Look Up Price History',1,'Lookup_Mod','ACTIVE','SEEDED');
INSERT INTO rights VALUES ('ADM_USER','Admin Activate User',1,'Adm_Mod','ACTIVE','SEEDED');

INSERT INTO "user" VALUES ('user1','jcesperanza','jcesperanza@neu.edu.ph','SUPERADMIN','ACTIVE','SEEDED');

INSERT INTO "UserModule_Rights" VALUES ('user1','SALES_VIEW',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','SALES_ADD',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','SALES_EDIT',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','SALES_DEL',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','SD_VIEW',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','SD_ADD',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','SD_EDIT',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','SD_DEL',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','CUST_LOOKUP',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','EMP_LOOKUP',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','PROD_LOOKUP',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','PRICE_LOOKUP',1);
INSERT INTO "UserModule_Rights" VALUES ('user1','ADM_USER',1);