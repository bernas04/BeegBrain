#!/bin/bash

./manage.py collectstatic --noinput
echo "Collect static"

./manage.py makemigrations app
echo "makemigrations done"

./manage.py migrate
echo "migrate done"

./manage.py runserver 8000
echo "runserver done"