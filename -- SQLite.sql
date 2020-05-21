-- SQLite

--カラム名　カラムのデータタイプ　PRIMARY KEY,
CREATE TABLE syain(
    id INTEGER PRIMARY KEY,
    firstName TEXT,
    name TEXT,
    phoneNumber INTEGER,
    mail TEXT
);


--INSERT INTO テーブル名(カラム名) VALUES (入力する値);
INSERT INTO syain(id, firstName, name, phoneNumber, mail) VALUES (
    100,
    "三重",
    "津",
    0120111,
    "mie@co.jp"
    ),
(
    101,
    "愛知",
    "名古屋",
    0120333,
    "aichi@co.jp"
),
(
    102,
    "岐阜",
    "岐阜",
    0120444,
    "gifu@co.jp"
),
(
    104,
    "静岡",
    "静岡",
    0120555,
    "sizuoka@co.jp"
),
 (
    105,
    "奈良",
    "奈良",
    0120666,
    "nara@co.jp"
);

DROP TABLE syain ;

--productテーブルからidが１のモノだけを削除する
DELETE FROM syain WHERE id = 1;

--SELECT カラム名 FROM テーブル名 [WHERE 条件]
--productテーブルのすべてカラムのデータを取得する
SELECT * FROM syain;

UPDATE syain SET amount = 10;
