import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const cardinal_theme: CustomThemeConfig = {
	name: 'cardinal_theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '4px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '255 255 255',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #e8c13a
		'--color-primary-50': '252 246 225', // #fcf6e1
		'--color-primary-100': '250 243 216', // #faf3d8
		'--color-primary-200': '249 240 206', // #f9f0ce
		'--color-primary-300': '246 230 176', // #f6e6b0
		'--color-primary-400': '239 212 117', // #efd475
		'--color-primary-500': '232 193 58', // #e8c13a
		'--color-primary-600': '209 174 52', // #d1ae34
		'--color-primary-700': '174 145 44', // #ae912c
		'--color-primary-800': '139 116 35', // #8b7423
		'--color-primary-900': '114 95 28', // #725f1c
		// secondary | #d7b756
		'--color-secondary-50': '249 244 230', // #f9f4e6
		'--color-secondary-100': '247 241 221', // #f7f1dd
		'--color-secondary-200': '245 237 213', // #f5edd5
		'--color-secondary-300': '239 226 187', // #efe2bb
		'--color-secondary-400': '227 205 137', // #e3cd89
		'--color-secondary-500': '215 183 86', // #d7b756
		'--color-secondary-600': '194 165 77', // #c2a54d
		'--color-secondary-700': '161 137 65', // #a18941
		'--color-secondary-800': '129 110 52', // #816e34
		'--color-secondary-900': '105 90 42', // #695a2a
		// tertiary | #4267f4
		'--color-tertiary-50': '227 232 253', // #e3e8fd
		'--color-tertiary-100': '217 225 253', // #d9e1fd
		'--color-tertiary-200': '208 217 252', // #d0d9fc
		'--color-tertiary-300': '179 194 251', // #b3c2fb
		'--color-tertiary-400': '123 149 247', // #7b95f7
		'--color-tertiary-500': '66 103 244', // #4267f4
		'--color-tertiary-600': '59 93 220', // #3b5ddc
		'--color-tertiary-700': '50 77 183', // #324db7
		'--color-tertiary-800': '40 62 146', // #283e92
		'--color-tertiary-900': '32 50 120', // #203278
		// success | #6ea829
		'--color-success-50': '233 242 223', // #e9f2df
		'--color-success-100': '226 238 212', // #e2eed4
		'--color-success-200': '219 233 202', // #dbe9ca
		'--color-success-300': '197 220 169', // #c5dca9
		'--color-success-400': '154 194 105', // #9ac269
		'--color-success-500': '110 168 41', // #6ea829
		'--color-success-600': '99 151 37', // #639725
		'--color-success-700': '83 126 31', // #537e1f
		'--color-success-800': '66 101 25', // #426519
		'--color-success-900': '54 82 20', // #365214
		// warning | #cf2954
		'--color-warning-50': '248 223 229', // #f8dfe5
		'--color-warning-100': '245 212 221', // #f5d4dd
		'--color-warning-200': '243 202 212', // #f3cad4
		'--color-warning-300': '236 169 187', // #eca9bb
		'--color-warning-400': '221 105 135', // #dd6987
		'--color-warning-500': '207 41 84', // #cf2954
		'--color-warning-600': '186 37 76', // #ba254c
		'--color-warning-700': '155 31 63', // #9b1f3f
		'--color-warning-800': '124 25 50', // #7c1932
		'--color-warning-900': '101 20 41', // #651429
		// error | #dc52a8
		'--color-error-50': '250 229 242', // #fae5f2
		'--color-error-100': '248 220 238', // #f8dcee
		'--color-error-200': '246 212 233', // #f6d4e9
		'--color-error-300': '241 186 220', // #f1badc
		'--color-error-400': '231 134 194', // #e786c2
		'--color-error-500': '220 82 168', // #dc52a8
		'--color-error-600': '198 74 151', // #c64a97
		'--color-error-700': '165 62 126', // #a53e7e
		'--color-error-800': '132 49 101', // #843165
		'--color-error-900': '108 40 82', // #6c2852
		// surface | #505096
		'--color-surface-50': '229 229 239', // #e5e5ef
		'--color-surface-100': '220 220 234', // #dcdcea
		'--color-surface-200': '211 211 229', // #d3d3e5
		'--color-surface-300': '185 185 213', // #b9b9d5
		'--color-surface-400': '133 133 182', // #8585b6
		'--color-surface-500': '80 80 150', // #505096
		'--color-surface-600': '72 72 135', // #484887
		'--color-surface-700': '60 60 113', // #3c3c71
		'--color-surface-800': '48 48 90', // #30305a
		'--color-surface-900': '39 39 74' // #27274a
	}
};
