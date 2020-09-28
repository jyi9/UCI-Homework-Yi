# Import dependencies

import csv
import os

# Set file path 

path = os.path.join(".gitignore", "pypoll_data.csv")

# Define function to append values 

def election_analysis():
    with open(path, newline='') as csvfile:
        election_data = csv.reader(csvfile, delimiter=",")

# Create counter and variables to begin analysis

        total_votes = 0
        candidates = []
        number_votes = []
        vote_percentages = []
        winner =  ""
        

        next(election_data, None)

        # Loop through data and append unique values to list

        for x in election_data:
            if x[-1] not in candidates:
                candidates.append(x[-1])
                number_votes.append(1)
            else:
                index = candidates.index(x[-1])
                number_votes[index] += 1
            total_votes += 1
        for y in number_votes:

            percentages = round((y/total_votes) * 100, 2)
            vote_percentages.append(percentages) 
        
        winner_index = vote_percentages.index(max(vote_percentages))
        winner = candidates[winner_index]
            
    # Output file as txt 

        output = ""
        output += "Election results \n-------------------------\n"
        output += "Total votes: " + str(total_votes) + "\n-------------------------\n"
        output += str(candidates[0]) + ": " + str(vote_percentages[0]) + "% " + "(" + str(number_votes[0]) + ")\n"
        output += str(candidates[1]) + ": " + str(vote_percentages[1]) + "% " + "(" + str(number_votes[1]) + ")\n"
        output += str(candidates[2]) + ": " + str(vote_percentages[2]) + "% " + "(" + str(number_votes[2]) + ")\n"
        output += str(candidates[3]) + ": " + str(vote_percentages[3]) + "% " + "(" + str(number_votes[3]) + ")\n"
        output += "-------------------------\nWinner: " + str(winner)  

        print(output)

    text_file = open('electionresults.txt', 'w')
    text_file.write(output)
    text_file.close()


# Call function 

election_analysis()
