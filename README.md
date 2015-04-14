To run the server:

```
DEBUG=TravelTest ./bin/www

```

To run the mongodb server:

```
mongod --dbpath /Users/tiffany_poss/Desktop/TravelTest/data/db


```


###Digital Ocean Notes

This changes it to be able to run the code node instead of nodejs


```
ln -s /usr/bin/nodejs /usr/bin/node

```

This runs mongodb in background

```

nohup mongod --dbpath=/data/db --port 27017 &

```

This Runs the website

```
nohup DEBUG=TravelTest ./bin/www &

```

[Notes on Input Types](http://www.w3schools.com/html/html_form_input_types.asp)

###Immediate ToDos

* Style Trips
* Style Login Page
* fix errors on put requests.
* ability to find friends on site and add them to your trip
* control when you can post
* emails must be unique

###Some Other Random Todos

* Ability to delete  your posts and update
* Be able to press enter to submit forms
* Be able to update the dates of the trip

###Big Todos

* Finish Posts
* Do Find Friends
* Host Online
* Work on Email Stuff
* Make Responsive

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