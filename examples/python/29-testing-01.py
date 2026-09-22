def checked_remaining_pages(total, read):
    if type(total) is not int or type(read) is not int:
        raise TypeError("页数需要是整数")
    if total <= 0 or read < 0 or read > total:
        raise ValueError("页数范围不正确")
    return total - read

assert checked_remaining_pages(200, 48) == 152
assert checked_remaining_pages(200, 0) == 200
assert checked_remaining_pages(200, 200) == 0

try:
    checked_remaining_pages(200, 201)
except ValueError:
    print("超出范围的输入被拒绝")
else:
    raise AssertionError("程序应拒绝超出范围的输入")

print("四项行为检查通过")
