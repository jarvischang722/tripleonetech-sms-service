CREATE TABLE  sms_text (
  id BIGINT(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type VARCHAR(10) NOT NULL COMMENT '訊息種類',
  text VARCHAR(600) NULL COMMENT '訊息內容',
  designate_dat DATE NULL COMMENT '指定發送日期',
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `msg_UNIQUE` (`type`,`designate_dat`));