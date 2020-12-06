**Project Team Members:**  Jacqueline Yi, Natalia Karimova, Arpi Bandikyan, Vanessa Lee
​
**Background:** We wanted to create a db containing book titles and book ratings from various sources.  In the case of this initiative, we found book review data from google and goodreads on kaggle.  In addition to that we were able to find data on the NYT bestsellers (week counts) that we thought would be an interesting comparison point as well.  Our production database will ultimately compare two different data platforms (Google Books, Goodreads) to determine similarities and differences based on user ratings.
​
**Data Sources:**
​
  https://www.kaggle.com/meetnaren/goodreads-best-books
  
  https://www.kaggle.com/bilalyussef/google-books-dataset
  
  https://data.world/typhon/new-york-times-bestsellers-from-2011-to-2018/workspace/file?filename=books_uniq_weeks.csv
  
  
Before we performed the ETL, we spent some time designing our db schema using QuickDBD.  Reference schema documentation for more details.  We determined that a relational     database would be more appropriate for this project and made the following assumptions:
  1) ISBN is a unique to every book
  2) Data sources are reliable
  
We performed the ETL process on this:
  - **Extract:**  
    -From the data sources indicated above, we were able to obtain csv files containing the information we needed.
    -We had to encode key files appropriately in order to read the csv files.  Please refer to the jupyter notebook for more specifics encoding used.
    
  - **Transform:**  Our goal is to create two tables within our database: (1) books and (2) rating
  
    -Books Table:
    
         -Upon checking value_counts, we learned of duplicate ISBN records in all our files which we dropped from the tables
      
         -Extract and retitle specific fields from the csv into new dataframes for further transformation
      
         -Merge google and goodreads data after preliminary transformations
      
         -Because we had title and author information from both google and goodreads data extracts where some were not populated, we created conditional statements to create a        new author and title column where google data would be used as precedence over goodreads data if google data was available.
     
    -Ratings Table:
    
         -Drop duplicates from the NYT bestsellers extract
      
         -Extract and retitle specific fields from the NYT bestsellers extract
      
         -Create a ratings dataframe that merged data from the books dataframe and the nyt dataframe
      
         -Develop a boolean column to indicate whether or not the book was ever a NYT Bestseller book
      
   - **Load:** 
      -We chose the relational database schema for the following reasons:
      
        - The International Standard Book Number (ISBN) is a numeric commercial book identifier which is **intended** to be unique.
        
        - All our data sources contained ISBN data that we could leverage to join data for analysis and for referential integrity.  Google, Goodreads, and NYT sources each had ISBN to reference
           
        - Our datasets were small, no file was greater than ~70K records
 
**Retrospective / Challenges**
  - As we were transforming the data, we found that the data in our source files were not reliable.  We discovered that ISBN were duplicated -AND- the book titles for similar   ISBN were different.  Most likely our source files were corrupted.  In the future, we would spend time upfront before even designing the schema to check the quality of the data especially our unique identifier!!!  
  - Selecting resource sources with known encoding information to read the files properly.  We spent alot of time guessing the appropriate encoding to use to read the files and found that occassionaly successful encoding for one team member didn't work for another.
  - ISBN is tricky to convert in jupyter notebook from an object to a string format; numbers represented in scientific format can easily be corrupted in csv files. 
  - What else did we learn about ISBNs?  There doesn't seem to be one database containing every ISBN ever issued.  2 seemingly reliable sources that people turn to are [Google Books](https://developers.google.com/books/) and [WorldCat](https://www.worldcat.org/affiliate/tools?atype=wcapi) (which has over 2 billion titles and lets you search by ISBN.  Both these sources have APIs available for public usage.  Going here and leveraging these API's in the future is what we would do.  Also, ISBN was introduced in 1968.  Books published prior to them may not have ISBNs -AND- ISBN quality is also dependent on the publishing houses assigning ISBN numbers to their books and mistakes are often made.  Duplicates can also occur from manual user entries.  Did you know that there is an [ISBN Governance Agency](https://www.isbn-international.org/content/what-isbn) located in London? 
  - The assignment was a great educational experience!
