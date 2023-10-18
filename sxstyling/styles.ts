const ButtonSx = {
	'&:hover': {
		// borderBottom: '1px solid #394960',
		color: 'var(--body-color)'
	},
	'&:active': {
		color: 'var(--body-color)',
	},
	position: 'relative',
	display: 'block',
	padding: 'var(--spacing-xxs)',
	fontWeight: '700',
	fontSize: '1rem',
	marginBottom: '-1px',
	color: 'var(--primary-color)',
	letterSpacing: '0em',
	lineHeight: '2',
	textTransform: 'none'
}

const ButtonActiveSx = {
	position: 'relative',
	display: 'block',
	padding: 'var(--spacing-xxs)',
	fontWeight: '700',
	fontSize: '1rem',
	marginBottom: '-1px',
	color: 'var(--body-color)',
	letterSpacing: '0em',
	lineHeight: '2',
	textTransform: 'none'
}

const BoxSx = {
	'&:hover': {
		'background': 'var(--body-bg-color-dark)',
		'borderBottom': '1px solid transparent'
	}
}

const BoxActiveSx = {
	'background': 'var(--body-bg-color-dark)',
	'borderBottom': '1px solid transparent'
}

const FavoriteIconSx = {
	'&:hover': { color: '#ddd', cursor: 'pointer' }
}

const TableFavoriteIconSx = {
	'&:hover': { color: '#ddd', cursor: 'pointer' },
	'verticalAlign': 'middle',
	'marginBottom': '0.5rem'
}


export { ButtonSx, BoxSx, ButtonActiveSx, BoxActiveSx, FavoriteIconSx, TableFavoriteIconSx }