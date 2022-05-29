FROM python:3.8

ENV PYTHONUNBUFFERED 1

WORKDIR /projBackend

COPY ./requirements.txt /projBackend/

RUN pip3 install -r requirements.txt

COPY . /projBackend/

EXPOSE 8000