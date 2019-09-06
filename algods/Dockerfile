# docker build -t algods-notebook .
# docker run --rm -it -p 8888:8888 -v 'C:\Users\admatei\practice\python\algods':/home/jovyan/ --name algos algods-notebook
# docker logs -f --tail -15 algods
FROM jupyter/minimal-notebook

USER root
RUN apt-get update \
    && apt-get install wget \
    python3 \
    python3-pip \
    tzdata -y \
    && apt-get clean && apt-get autoremove

# ENV MAGICK_HOME=/usr
# RUN apt-get install libmagickwand-dev imagemagick python-wand -y
# RUN ls /etc/ImageMagick-6/policy.xml
# RUN mv /etc/ImageMagick-6/policy.xml /etc/ImageMagick-6/policy.xmlout

USER jovyan
WORKDIR /home/jovyan

RUN pip install --upgrade pip

COPY requirements.txt .
RUN pip install -r requirements.txt

ENV PYTHONPATH=$PYTHONPATH:/home/jovyan/src

EXPOSE 8888
EXPOSE 9999

# ENTRYPOINT echo $@; while true; do sleep 5; done