/// <reference types="@sveltejs/kit" />

interface SessionData {
	views: number;
}

// See https://kit.svelte.dev/docs#typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		session: import('svelte-kit-cookie-session').Session<SessionData>;
	}

	interface PageData {
		session: SessionData;
	}

	interface Platform {}

	interface PrivateEnv {}

	interface PublicEnv {}
}