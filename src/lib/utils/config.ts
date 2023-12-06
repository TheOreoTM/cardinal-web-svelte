import { PathNames } from './constants';
import { generateBotInvite } from './functions';

export const NavbarItems: { title: string; href: string; newTab?: boolean }[] = [
	{
		href: PathNames.Manage,
		title: 'Dashboard'
	},
	{
		href: generateBotInvite(),
		title: 'Invite Bot',
		newTab: true
	},
	{
		href: PathNames.Status,
		title: 'Status',
		newTab: true
	}
];
