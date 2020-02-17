DROP TABLE IF EXISTS userstorage;

CREATE TABLE userstorage
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(255),
  lotNumber TEXT,
  quantities VARCHAR(255),
  purchaseOrder VARCHAR(255),
  receivedDate DATE,
  expData DATE
);