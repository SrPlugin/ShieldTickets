import { Client, type ParseClient } from "seyfert";

async function boostrap() {
	const client = new Client({});

	client.start().then(() =>
		client.uploadCommands({
			cachePath: "./commands.json",
		}),
	);
}

boostrap().catch((error) => {
	console.error(`Failed to start the client: ${error}`);
	process.exit(1);
});

declare module "seyfert" {
	interface UsingClient extends ParseClient<Client<true>> {}
}
