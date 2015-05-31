###Thing to Fix after Data restructure

* Make trip_id and all model reference all nested data above them.
* Make voting it's own model.
* Make it so archive only shows deleted items from current trip.


[bash profile](http://www.moncefbelyamani.com/create-aliases-in-bash-profile-to-assign-shortcuts-for-common-terminal-commands/)



###Git Branch Tutorial

[Link to Branch Tutorial](https://www.atlassian.com/git/tutorials/using-branches)

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





###Anylitics

[Stuff to Track](http://flippa.com/blog/5-key-metrics-to-always-track-in-your-web-analytics/)


#####Google
```


  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-62513798-1', 'auto');
  ga('send', 'pageview');




```