def remaining_pages(total, read):
    return max(total - read, 0)

result = remaining_pages(200, 48)
print(result)
