raw_count = "三本"

try:
    count = int(raw_count)
except ValueError:
    print("数量需要写成整数，例如 3。")
else:
    print(f"收到 {count} 本书。")
