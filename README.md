* Email send out to invite people to your trip
* email capture mail chimp



###Immediate Must Dos

* Make a google doc or trello for list of bugs or small tweeks.
* ablility to email a list of people
* fix weird bug on down vote that will vote mulitple times
* fix ability to upvote and downvote on one item.
* Make all append divs into partials so later manipulation will be a snap
* ability to find friends on site and add them to your trip
* Make Certain categories automatical generate when a trip is created.
* Fix link button length so id doesn't break if its too long
* populate the first suggestion's comments
* Fix the trip name in upper left corner to format nicer
* fix the user's name in the comment suggestion box
* Splash Page
* Style Trips
* Style Login Page
* control when you can post
* emails must be unique



###Some Other Random Todos

* Ability to delete  your posts and update
* Be able to press enter to submit forms
* Be able to update the dates of the trip

###Big Todos


* Do Find Friends
* Test MongoDB database
* Work on Email Stuff
* Make Responsive

###Running Locally

To run the server:

```
DEBUG=TravelTest ./bin/www

```

To run the mongodb server:

```
mongod --dbpath /Users/tiffany_poss/Desktop/TravelTest/data/db


```


###Digital Ocean Production Server

```
ssh root@104.131.57.112

```
This changes it to be able to run the code node instead of nodejs

```
ln -s /usr/bin/nodejs /usr/bin/node

```

#####Running the Program

This runs mongodb in background ()

```
nohup mongod --dbpath=/data/db --port 27017 &

```

This Runs the website

```

nohup nodemon app.js &

```



###Digital Ocean Production Server

ssh root@45.55.221.131

nohup mongod --dbpath=/data/db --port 27017 &

nohup node app.js &

#####Other Notes

* I had to install node
* Installed mongodb

[Notes on Input Types](http://www.w3schools.com/html/html_form_input_types.asp)



###Stuff to Remember


[MongoDB Docs](http://docs.mongodb.org/manual/core/crud-introduction/)

[More Docs](http://docs.mongodb.org/manual/reference/glossary/#term-collection)

[Mongoose](http://mongoosejs.com/docs/index.html)

[Mongoose](http://mongoosejs.com/docs/guide.html)

[More Mongoose](http://mongoosejs.com/docs/index.html)

[Monmore](http://mongoosejs.com/docs/guide.html)

[stuff](https://github.com/Automattic/mongoose)

[BEST STUFF](http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)

[VIDEO](https://www.youtube.com/watch?v=5e1NEdfs4is)