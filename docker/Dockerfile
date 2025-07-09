# ---- Stage 1: Build libpostal ----
FROM ubuntu:24.04 AS libpostal-builder

RUN apt-get update && \
    apt-get install -y \
        curl \
        autoconf \
        automake \
        libtool \
        pkg-config \
        git \
        build-essential \
        ca-certificates

WORKDIR /opt
RUN git clone https://github.com/openvenues/libpostal.git && \
    cd libpostal && \
    ./bootstrap.sh && \
    ./configure --datadir=/usr/local/share/libpostal && \
    make -j$(nproc) && \
    make install && \
    ldconfig

# ---- Stage 2: Build Node App ----
FROM node:22-slim AS build

# Install runtime dependencies for libpostal
RUN apt-get update && \
    apt-get install -y \
        libtool \
        pkg-config \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy libpostal from builder
COPY --from=libpostal-builder /usr/local/lib/libpostal* /usr/local/lib/
COPY --from=libpostal-builder /usr/local/include/libpostal /usr/local/include/libpostal
COPY --from=libpostal-builder /usr/local/share/libpostal /usr/local/share/libpostal

ENV LIBPOSTAL_DATA_DIR=/usr/local/share/libpostal
ENV LD_LIBRARY_PATH=/usr/local/lib

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# ---- Stage 3: Production image ----
FROM node:22-slim

RUN apt-get update && \
    apt-get install -y \
        libtool \
        pkg-config \
        ca-certificates \
        build-essential \
        python3 \
        git \
        autoconf \
        automake \
        curl \
        && rm -rf /var/lib/apt/lists/*

# Copy libpostal from builder
COPY --from=libpostal-builder /usr/local/lib/libpostal* /usr/local/lib/
COPY --from=libpostal-builder /usr/local/include/libpostal /usr/local/include/libpostal
COPY --from=libpostal-builder /usr/local/share/libpostal /usr/local/share/libpostal

ENV LIBPOSTAL_DATA_DIR=/usr/local/share/libpostal
ENV LD_LIBRARY_PATH=/usr/local/lib

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/docker/entrypoint.sh ./docker/entrypoint.sh
COPY .env.example ./

EXPOSE 3000

ENTRYPOINT ["sh", "./docker/entrypoint.sh"]
