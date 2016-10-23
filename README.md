    *** Apologies, I had misread the challenge as just a example page to intepret data to d3.js***

    For a list of features and changes, refer to Wiki

    # install packages
    $ pip install Flask
    $ pip install Flask-Login
    $ pip install Flask-PyMongo
    $ pip install Flask-Script
    $ pip install celery

    # install mongodb and rabbitmq
    $ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    $ echo "deb http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    $ echo 'deb http://www.rabbitmq.com/debian/ testing main' |
            sudo tee /etc/apt/sources.list.d/rabbitmq.list
    $ sudo apt-get update
    $ sudo apt-get install rabbitmq-server
    $ sudo apt-get install -y mongodb-org

    # start rabbitmq and mongodb
    $ service mongod start
    $ service rabbitmq-server start

    # install nmap
    $ sudo apt-get install nmap

    # install python-libnmap
    $ pip install libnmap

    # install the webgui
    $ git clone https://github.com/limquanheng/nmap-webgui.git
    $ cd nmap-webgui
    $ python setup.py install

    # run celery
    $ celery -A nmapui.tasks worker --loglevel=debug

    # add a user, start the web app in debug and login
    $ python manage.py adduser <username> <email>
    $ python manage.py runserver

    Default run location is 127.0.0.1:8080
    Originally run on python 2.7, on Ubuntu 16.0.4
