# Personal Web Portfolio build using React, Material Design, Bootstrap, Wagtail.io, and Django.

## django/wagtail
./manage.py migrate
./manage.py makemigrations
./manage.py runsslserver
http://localhost:8000/admin/login/?next=/admin/

## react
npm start
http://localhost:3000

### Note
Because this app runs off the build script and manage.py simultaniously, if you need to change anything react related that's not included within the app you'll need to run the build script within the package.json file before pushing. Example, if a H1 on any given page was coded directly into React you'll need to run the build script to make sure it's pushed to the build folder.

### Commands

pip freeze > requirements.txt
pip install -r requirements.txt