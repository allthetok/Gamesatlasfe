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

const IconSx = {
	'&:hover': { color: '#ddd', cursor: 'pointer' }
}

const TableFavoriteIconSx = {
	'&:hover': { color: '#ddd', cursor: 'pointer' },
	'verticalAlign': 'middle',
	'marginBottom': '0.5rem'
}

const ListTblToggleSx = (selected: string, button: string) => {
	if (selected === 'list' && button === 'listbtn') {
		return { bgcolor: '#121212', border: 'none', '&:hover': { bgcolor: '#121212', border: 'none' } }
	}
	else if (selected === 'table' && button === 'listbtn') {
		return { bgcolor: '#383838', border: 'none', '&:hover': { bgcolor: '#121212', border: 'none' } }
	}
	else if (selected === 'table' && button === 'tblbtn') {
		return { bgcolor: '#121212', border: 'none', '&:hover': { bgcolor: '#121212', border: 'none' } }
	}
	else { //selected === 'list' && button === 'tbltn'
		return { bgcolor: '#383838', border: 'none', '&:hover': { bgcolor: '#121212', border: 'none' } }
	}
	// else if (selected === 'table' && button === 'listbtn') {
	// 	return { bgcolor: '#202020', border: 'none', '&:hover': { bgcolor: '#383838', border: 'none' } }
	// }
	// else if (selected === 'list' && button === 'tblbtn') {
	// 	return { bgcolor: '#202020', border: 'none', '&:hover': { bgcolor: '#383838', border: 'none' } }
	// }
	// else {
	// 	return { bgcolor: '#202020', border: 'none', '&:hover': { bgcolor: '#121212', border: 'none' } }
	// }
	// return selected=== 'list' ? { bgcolor: `${selected === 'list' ? '#121212': '#202020'}`, border: 'none', '&:hover': { bgcolor: '#383838', border: 'none' } } : { bgcolor: `${selected === 'table' ? '#121212': '#202020'}`, border: 'none', '&:hover': { bgcolor: '#383838', border: 'none' } }
}

export { ButtonSx, BoxSx, ButtonActiveSx, BoxActiveSx, IconSx, TableFavoriteIconSx, ListTblToggleSx }