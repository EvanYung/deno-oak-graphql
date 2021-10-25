server:
	deno run -A --watch --unstable --import-map=import_map.json --no-check server.ts
seeds:
	deno run -A --import-map=import_map.json --no-check commands/seeds/init.ts