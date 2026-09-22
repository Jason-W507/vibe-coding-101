-- 本文件在新建或空数据库中运行。对应第 20、21 篇。
PRAGMA foreign_keys = ON;

CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    total_pages INTEGER NOT NULL CHECK (total_pages > 0),
    read_pages INTEGER NOT NULL
        CHECK (read_pages >= 0 AND read_pages <= total_pages)
);

INSERT INTO books (id, title, total_pages, read_pages)
VALUES (1, '计算机基础', 200, 48),
       (2, '软件开发入门', 160, 0);

SELECT id, title, read_pages, total_pages
FROM books
WHERE read_pages < total_pages
ORDER BY id;

CREATE TABLE reading_events (
    book_id INTEGER NOT NULL REFERENCES books(id),
    page INTEGER NOT NULL
);

BEGIN;
UPDATE books SET read_pages = 60 WHERE id = 1;
INSERT INTO reading_events (book_id, page) VALUES (1, 60);
COMMIT;

-- 事务提交后的状态：第一本书已读 60 页，日志记录一次更新。
SELECT id, read_pages FROM books ORDER BY id;
SELECT book_id, page FROM reading_events;
