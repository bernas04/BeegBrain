FROM python:3.8

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY ./requirements.txt .

RUN pip3 install -r requirements.txt

COPY . /backend/

EXPOSE 8080

ENTRYPOINT ["python","manage.py","runserver","0.0.0.0:8080"]