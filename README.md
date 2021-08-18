### :rocket: hashcode
    hashcode is a website developed for creating and attempting virtual contest cooked using codeforces problems.
    The major functions of website relies on communication with codeforces API.
    Features of hashcode are -- 
    1. Creating public/private , mashup/lockout virtual contests.
    2. Various useful links of competitive programming in organized way.
    3. List of some most frequent STL functions.
    4. Collection of good to know one liner facts of competitive programming.
    5. Visulization of any rated contest of codeforces.
    
   :zap: Link to live website <a href="https://hashedcode.herokuapp.com" target="_blank">here</a>.
    
### :dart: In future features: 
    Here is the list of the features which can be added in hashcode in future--
    1. Speedrun contests for improving speed in (A,B,C) problems.
    2. Building some interface to find coding buddies of same goal and interest. 

### :hammer_and_wrench: Installation:
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/hashcode)

#### Local Enviornment Setup
    1. Cloning repository.
          git clone <repo link> or locally download zip folder.
          
    2. Install all dependencies.
          npm install
          
    3. Set all enviorement variables in .env file.
          url = <MONGODB URI>
          clientID = <Google O Auth client id>
          clientSecret = <Google O Auth client secret>
          KEY = <Any secret string>
          JWT_KEY = <Any secret string>
          origin = <http://localhost:3000 (for dev) https://hashedcode.herokuapp.com (for production)>
       
    4. Run web-app on local host.
          node  (entry js file)
       
### :wrench: Contributing:
     1. If you have any idea to improve any functionality or adding new functionality or improving   content.
        You can do that by making some good,  Pull requests in our repository.
     2. You can report any bug or suggest any feature or any improvement by creating an issue.
     3. Contribution step 
        i) Fork the repository.
        ii) Setup local codebase of forked repository (From installation step)
        ii) Add new feature , remove any bug, improve existing feature.
        iii) Push those chanegs to your forked repository.
        iv) Create a pull request to main branch.
     
