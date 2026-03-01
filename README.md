# ShieldTickets

A Discord bot providing a full ticket system for servers that require structured support or moderation workflows. Built for efficiency and low resource usage, following clean code practices.

## Stack

- **Runtime:** [Bun](https://bun.sh)
- **Framework:** [Seyfert](https://seyfert.dev)
- **Database:** PostgreSQL with [DrizzleORM](https://orm.drizzle.team)
- **Configuration:** YAML-based setup for per-guild customization

## Requirements

- Bun 1.x
- PostgreSQL

## Setup

1. Clone the repository and install dependencies:

```bash
bun install
```

2. Copy `.env.template` to `.env` and set your environment variables (bot token, database URL, etc.).

3. Configure the bot via YAML as needed for your guild.

4. Run the bot:

```bash
bun run start
```

For development with file watching:

```bash
bun run start:dev
```

## License

See [LICENSE](LICENSE) for details.
