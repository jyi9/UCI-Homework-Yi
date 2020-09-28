import os
import csv 

# Path to collect data from gitignore folder 

pybank_data = os.path.join(".gitignore", "pybank_data.csv")
with open(pybank_data, 'r') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)
    
# Create variables and empty lists for months and profits/losses 

    month = []
    profit_losses = []
    monthly_change = []
    
# Counter for total amount

    total = 0 

# Loop through file and append values to lists

    for row in csvreader:
        month.append(row[0])
        profit_losses.append(row[1])
        total += (int(row[1]))

# Total number of months
    total_months = len(month)

# Loop through profit/losses values 

    i = 0 
    for i in range(len(profit_losses) - 1):
       
        change_values = int(profit_losses[i + 1]) - int(profit_losses[i])
        monthly_change.append(change_values)

# Total change and average change 

    total_change = sum(monthly_change)

    avg_change = round(total_change / len(monthly_change), 2)

# Calculate greatest increase and decrease 

    greatest_increase = max(monthly_change)
    month_increase = month[monthly_change.index(greatest_increase) + 1]

    greatest_decrease = min(monthly_change)
    month_decrease = month[monthly_change.index(greatest_decrease) + 1]

# Print analysis to terminal 


    output = ""
    output = "Financial Analysis"
    output += "\n-----------------------------------\n"
    output += "Total Months: " + str(total_months) + "\n"
    output += "Total: $" + str(total) + "\n"
    output += "Average Change: $" + str(avg_change) + "\n"
    output += "Greatest Increase: " + str(month_increase) + " $" + str(greatest_increase) + "\n"
    output += "Greatest Decrease: " + str(month_decrease) + " $" + str(greatest_decrease) + "\n"

    print(output)

    text_file = open('pybank_results.txt', 'w')
    text_file.write(output)
    text_file.close()






   
  
