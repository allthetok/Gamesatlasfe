const ButtonSx = {
	'&:hover': {
		// borderBottom: '1px solid #394960',
		color: '#ddd'
	},
	'&:active': {
		color: '#ddd',
	},
	position: 'relative',
	display: 'block',
	padding: 'var(--spacing-xxs)',
	fontWeight: '700',
	marginBottom: '-1px',
	color: '#9fc1ea',
	letterSpacing: '0em',
	textTransform: 'none'
}

const ButtonActiveSx = {
	position: 'relative',
	display: 'block',
	padding: 'var(--spacing-xxs)',
	fontWeight: '700',
	marginBottom: '-1px',
	color: '#ddd',
	letterSpacing: '0em',
	textTransform: 'none'
}

const BoxSx = {
	'&:hover': {
		'background': '#1b1e22',
		'borderBottom': '1px solid transparent'
	}
}

const BoxActiveSx = {
	'background': '#1b1e22',
	'borderBottom': '1px solid transparent'
}


export { ButtonSx, BoxSx, ButtonActiveSx, BoxActiveSx }