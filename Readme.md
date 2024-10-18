
The data for both files was retrieved with requests to our API
GET /meterdata/measurement
The parameters for the first file were
muid=95ce3367-cbce-4a4d-bbe3-da082831d7bd&measurement=energy&limit=5000&start=2023-02-01&stop=2023-03-01
The parameters for the second file were
muid=1db7649e-9342-4e04-97c7-f0ebb88ed1f8&measurement=energy&limit=5000&start=2023-02-01&stop=2023-03-01
While the links that you will be working against only return a raw JSON file, we ask you treat it as if it were a full-fledged API.

### Task A - Data Exploration
Explore the data and group it by different time intervals. Explain what you see/what the data represents. Come up with a hypothesis on what kind of data you are looking at.
Bonus: Check for any autocorrelation within the time-series data.

##### Answer:
Meter data.<br>
The first one looks like
1db7649e-9342-4e04-97c7-f0ebb88ed1f8 => energy produced from solar panel, Because the reading starts during daytime<br>
Eg: the values start from morning 7:00 - 7:30 till evening. and the value is as its peak during afternoon. <br>

95ce3367-cbce-4a4d-bbe3-da082831d7bd => seems to be cost per watt as the data does not look uniform. <br />
Maybe its resistance or something but I feel its cost per unit because thats what the company displays to the customer mainly :) but i dont have concrete answer to it unfortunately

muid => meter uid <br>
measurement => "energy" <br>
limit = > cap<br>
start => from <br>
stop => end <br>


### Task B - Backend
### Answer 
I have used Nest.js along with postgresql for database as its one of tech which I have recently learned. <br />
i was not able to integrate in docker as prisma required some ssl and I was not able to integrate through docker. <br />
And additionally I have added a script in migration with which we can import the data (Provided JSON file to the database) and i have explained in installation step below. <br />

### Task C - Frontend
### Answer
I have use rechart library as it was easy to integrate, On launch I fetch both the data and rendered it on UI as it was easy. <br />
I tried to keep it simple as possible but i was literally deep dived into it and ended up over engineering i feel :) <br />
I should have written more test cases but since is spent significant time in it, I decided to write few. <br />


### Installation Process:
The front end is straightforward to start, and I've also dockerized it, so it should be easy to start the application<br >

The database is also dockerized, making it easy to set up. <br >After running it, there are two scripts that need to be executed: <br >a. Creating the table: In packages > server > prisma, there's a folder called migration, which contains the code for creating the table (0_init).
<br >b. Importing data: After creating the table, we need to import the data. I've written a script that can be run using npm run import. <br >This will dump the JSON data into the PostgreSQL database.<br >

The Prisma client needs to be initialized before running backend, which you can find here: Prisma Client Documentation. https://www.prisma.io/docs/orm/overview/databases/postgresql<br >


