FROM docker.io/rust:1.75-slim-bookworm AS chef
RUN cargo install cargo-chef
WORKDIR /build

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS build
ARG pkg=vc-session-management
COPY --from=planner /build/recipe.json recipe.json
# Build dependencies (cached layer)
RUN --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/usr/local/cargo/git \
    cargo chef cook --release --recipe-path recipe.json
# Build application
COPY . .
RUN --mount=type=cache,target=/build/target \
    --mount=type=cache,target=/usr/local/cargo/registry \
    --mount=type=cache,target=/usr/local/cargo/git \
    set -eux; \
    cargo build --release; \
    cp target/release/$pkg ./main

FROM gcr.io/distroless/cc-debian12:nonroot
WORKDIR /app
# Copy binary
COPY --from=build /build/main ./main
COPY --from=build --chown=nonroot:nonroot /build/Rocket.toml* ./
COPY --from=build --chown=nonroot:nonroot /build/static* ./static/
COPY --from=build --chown=nonroot:nonroot /build/templates* ./templates/

ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8080

EXPOSE 8080

USER nonroot

CMD ["./main"]