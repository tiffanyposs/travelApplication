###Avatars

* One per person per trip
* Avatar for each trip everything will change
* bubbles of avatars for people who voted
* One page/scroll with all the avatars, greyed out the ones that are already choosen
* Sillouette of platius for default


###Anaylsis

*Find paper!




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



###Forever

[FOREVER DOCUMENTATION](http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever/)


```
$[sudo] npm install -g forever

```

```
$ forever start app.js

```

```
$ ps axl | grep node

```



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