import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	// Fetch cardinal data

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	module: async ({ request }) => {
		const data = await request.formData();

		if (!data.get('module-enabled')) {
			data.set('module-enabled', 'false');
		}

		console.log(data);
	},
	antihoist: async ({ request }) => {
		const data = await request.formData();

		if (!data.get('anti-hoist')) {
			data.set('anti-hoist', 'false');
		}

		console.log(data);
	},
	report: async ({ request }) => {
		const data = await request.formData();

		console.log(data);
	},
	minage: async ({ request }) => {
		const data = await request.formData();

		console.log(data);
	},
	modrole: async ({ request }) => {
		const data = await request.formData();

		console.log(data);
	}
};
