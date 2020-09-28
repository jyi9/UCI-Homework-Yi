# Import dependencies

import os 
import csv 

# Set file path 
pybank_data = os.path.join(".gitignore", "pybank_data.csv")


# Open and read csv 
with open(pybank_data) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    print(csvreader)
    csv_header = next(csvreader)
    for row in csvreader:
        print(row)



# Define function that returns total number of months 

def count_months():
    count = []
    for row in csvreader:
        count = count.append(row[0])
    return count 
count_months()    