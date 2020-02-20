DROP TABLE IF EXISTS user_table;

CREATE TABLE user_table
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(255),
  lotNumber TEXT,
  quantities VARCHAR(255),
  purchaseOrder INTEGER,
  receivedDate VARCHAR(255),
  expData VARCHAR(255)
);