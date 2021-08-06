FROM denoland/deno:1.12.2

# The port that your application listens to.
EXPOSE 8001

WORKDIR /app

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
COPY . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
# RUN deno cache server.ts

CMD ["run", "-A", "--location=http://127.0.0.1:8001", "--import-map=import_map.json", "server.ts"]