DROP TABLE IF EXISTS user-storage;

CREATE TABLE user_storage
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(255),
  lotNumber TEXT,
  Quantities VARCHAR(255),
  purchaseOrder VARCHAR(255),
  ReceivedDate DATE,
  expData DATE,
)