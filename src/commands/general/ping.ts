import { Command, type CommandContext, Declare, Embed } from "seyfert";

@Declare({
	name: "ping",
	description: "Show bot latency",
})
export default class PingCommand extends Command {
	override async run(ctx: CommandContext) {
		const latency = ctx.client.gateway.latency;

		const embed = new Embed()
			.setTitle("Pong!")
			.setDescription(`> **Latency:** ${latency}ms`)
			.setColor(`Red`)
			.setFooter({
				text: `Developed by Sebastian Cheikh`,
				iconUrl: ctx.client.me.avatarURL(),
			});

		await ctx.write({ embeds: [embed] });
	}
}
