Scrumblr
========

what is it
----------
Scrumblr is a web-based simulation of a physical agile kanban board that supports real-time collaboration. it is built using node.js, websockets (using socket.io), CSS3, and jquery.

run scrumblr
------------

You can run a standalone docker image by using docker-compose. Simply change the config as below, then run:

```docker build -t scrumblr .```
```docker-compose up```

This uses the 'official' node image from the clever folks at:

https://hub.docker.com/_/node/

Alternatively, you can follow the instructions below to setup scrumblr yourself. it is very simple -- it just uses redis and node.js.

configuration
-------------

Out of the box, scrumblr tries to connect to a redis on localhost default port (6379). If you need to change this, or need to run using docker, then copy the conf/config.js.template to conf/config.js and edit the dbHost and dbPort values. The above docker-compose formula expects a host of 'redis' so the template will work unedited.

You can also set some jira settings in here which will allow you to 'import' cards with headings and titles matching a sprint set up in jira with the same name as the board.

browser support
---------------

scrumblr works on up to date chrome and firefox browsers. enable websockets for optimal performance. tested mainly on chrome for osx. this was not designed for browser support. use chrome for this app.

how to install and run on your own computer (linux/osx)
-------------------------------------------------------

- [install redis v2.2.2](http://redis.io/download)
- [install node.js >= 0.4.7](http://nodejs.org/)
- install npm (if you're running node.js [v0.6.3](https://github.com/joyent/node/commit/b159c6) or newer it's already installed!)
- cd to the scrumblr directory; you should see server.js and config.js and other files.
- run `npm install`
- If you get errors about express, you may need to change in package.json to have "express":  ">=2.4.x", 
- run redis `redis-server`
- run scrumblr `node server.js 80` where "80" is the port you have opened in your firewall and want scrumblr to run on. 
- open a browser to `http://localhost:80` where "80" is the port you chose in the previous step.

license
-------

scrumblr is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

scrumblr is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

See <http://www.gnu.org/licenses/>.

the *images* used in scrumblr, however are licensed under cc non commercial noderivs:

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-nd/3.0/80x15.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/">Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License</a>.

Some Icon images provided by (Tatice) at http://tatice.deviantart.com/

author
------

ali asaria - [well.ca](http://well.ca) - ali [at] well.ca
