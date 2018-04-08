DROP DATABASE IF EXISTS db;
CREATE DATABASE db CHARACTER SET UTF8;

DROP TABLE IF EXISTS db.user;
CREATE TABLE db.user (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'id, PK',
    username VARCHAR(20) UNIQUE COMMENT '用户名 UN',
    email VARCHAR(255) UNIQUE COMMENT '邮箱 UN',
    mobile VARCHAR(11) UNIQUE COMMENT '手机号 UN',
    password VARCHAR(64) NOT NULL COMMENT '密码 NN',
    avatar VARCHAR(20) DEFAULT 'default.png' COMMENT '头像文件',
    nick VARCHAR(20) UNIQUE COMMENT '昵称 UN',
    gender CHAR(2) COMMENT '性别',
    dob DATE COMMENT '出生日期'
) COMMENT '用户表';

DROP TABLE IF EXISTS db.product;
CREATE TABLE db.product(
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'id, PK',
    title VARCHAR(255) NOT NULL COMMENT '商品名称 NN',
    coverPicture VARCHAR(255) NOT NULL COMMENT '封面图片 NN',
    price DECIMAL(8,2) NOT NULL COMMENT '商品价格 NN',
    brief VARCHAR(255) COMMENT '商品简介',
    feature VARCHAR(255) COMMENT '商品特色',
    tags VARCHAR(255) COMMENT '商品标签',
    type VARCHAR(255) COMMENT '商品类别'
) COMMENT '商品表';

-- 添加样本数据

DROP PROCEDURE IF EXISTS db.gen_product_sample_data;
DELIMITER $$
CREATE PROCEDURE db.gen_product_sample_data()
    BEGIN
        DECLARE counter INT DEFAULT 1;
        WHILE counter < 1001 DO
            INSERT INTO
                db.product(title, coverPicture, price)
                VALUE(
                    CONCAT('商品名称：', counter),
                    'default.png',
                    FLOOR(RAND() * 100000)
                );
            SET counter = counter + 1;
        END WHILE;
    END $$

CALL db.gen_product_sample_data();