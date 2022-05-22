FROM python:3.8

ENV PYTHONUNBUFFERED 1

WORKDIR /projBackend

COPY ./requirements.txt .

COPY ./entrypoint.sh /S/docker/entrypoint.sh

RUN pip3 install -r requirements.txt

COPY . /projBackend/

EXPOSE 8000

# entrypoint, must be executable file chmod +x entrypoint.sh
COPY entrypoint.sh /docker/entrypoint.sh

RUN chmod +x /docker/entrypoint.sh

# what happens when I start the container
CMD ["/docker/entrypoint.sh"]