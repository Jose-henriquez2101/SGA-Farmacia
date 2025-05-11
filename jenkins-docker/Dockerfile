FROM jenkins/jenkins:lts

USER root

# Actualizar el índice de paquetes e instalar dependencias
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg \
    lsb-release \
    ca-certificates \
    sudo \
    git \
    docker.io \
    docker-compose && \
    apt-get clean

# Instalar Docker Compose (si es necesario una versión específica, puedes ajustarlo)
RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Agregar el usuario Jenkins al grupo Docker para que pueda usar Docker sin sudo
RUN usermod -aG docker jenkins

USER jenkins
