import re

note = "2026-05-01 读完第 48 页；2026-05-02 读完第 60 页"
dates = re.findall(r"\d{4}-\d{2}-\d{2}", note)
is_isbn = bool(re.fullmatch(r"\d{13}", "9787111213826"))
print(dates, is_isbn)
