# time psql -d lab4out -q -f data6.sql

import csv
import os 

# lst = os.listdir('./data')
# print(lst)


lst = [
    'test_appointment'  , 
    'prescribed_meds'  ,
    'prescribed_tests'  , 
    'medicine'         ,
    'test'            ,
    'prescription',
    'admit',
    'real_transaction'  , 
    'wallet_transaction',
    'appointment',
    'bed',
    'doctor',
    'admin',
    'director',
    'pharmacy_keeper',
    'pathologist',
    'accountant',
    'nurse'          ,
    'staff'         ,
    'patient'          ,
    'lab'            ,
    'ward',
    'department',
    'slot_interval'  ,
    'slot'
]          

print(lst)
# for file in lst:
#     with open('temp.sql','a') as f:
#        f.write("\set localpath `pwd`'/data/{}\ncopy {} from :'localpath' delimiter ',' csv header NULL 'NULL';\n\n".format(file,file[:-4]))


# for filename in lst:

#     sql = "insert into covid values('{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}');\n"

#     def makecommand(row):
#         return sql.format(*row)

#     with open(filename+'.csv','r') as f:
#         with open(filename+'.sql', 'wt') as w:
#             reader = csv.reader(f)
#             reader.__next__()
#             for row in reader:
#                 # print(row)
#                 w.write(makecommand(row))
                



