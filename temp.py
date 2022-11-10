# n=4
# 1
# 2 7
# 2 6 8
# 4 5 9 10 

# n=5
# 1
# 2 9
# 3 8 10
# 4 7 11 14
# 5 6 12 13 15

# generate number pattern in alternating reverse pyramid shape
n = 4
for i in range(1, n+1):
    for j in range(1, i+1):
        print(i+j-1, end=' ')
    print()
