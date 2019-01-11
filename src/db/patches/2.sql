-- 商戶資料
CREATE TABLE merchant (
  id BIGINT(20) PRIMARY KEY AUTO_INCREMENT  NOT NULL,
  code VARCHAR(100) NOT NULL,
  name VARCHAR(50) NOT NULL,
  created timestamp DEFAULT CURRENT_TIMESTAMP,
  last_updated timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX code_UNIQUE (code ASC));