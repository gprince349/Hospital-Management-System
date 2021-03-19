\set localpath `pwd`'/data/staff.csv'
copy staff from :'localpath' delimiter ',' csv header NULL 'NULL';