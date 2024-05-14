# pull official base image
FROM python:3.11.3-alpine

# set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# set work directory
WORKDIR /app/backend

COPY requirements.txt /app/backend/

# install dependencies
RUN apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apk --purge del .build-deps

# copy project
COPY . /app/backend/


# Set Backend API
# set work directory for flask api
WORKDIR /app/backend/adapters/api

# expose port 8000
EXPOSE 8000

# run flask app
CMD python ../../populate_database.py && python app.py 8000