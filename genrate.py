# time psql -d lab4out -q -f data6.sql

import csv
import os 

lst = os.listdir('./data')
print(lst)


for filename in lst:

    sql = "insert into covid values('{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}');\n"

    def makecommand(row):
        return sql.format(*row)

    with open(filename+'.csv','r') as f:
        with open(filename+'.sql', 'wt') as w:
            reader = csv.reader(f)
            reader.__next__()
            for row in reader:
                # print(row)
                w.write(makecommand(row))
                



