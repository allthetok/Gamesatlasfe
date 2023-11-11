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

const ButtonAdvSx = {
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
	fontSize: '1.25rem',
	marginBottom: '-1px',
	color: 'var(--primary-color)',
	letterSpacing: '0em',
	lineHeight: '2',
	textTransform: 'none',
}

const ButtonAdvActiveSx = {
	position: 'relative',
	display: 'block',
	padding: 'var(--spacing-xxs)',
	fontWeight: '700',
	fontSize: '1.25rem',
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

const BoxAdvSx = {
	'&:hover': {
		'background': 'var(--body-bg-color-dark)',
		'borderBottom': '1px solid transparent'
	}
}

const BoxAdvActiveSx = {
	'background': 'var(--body-bg-color-dark)',
	'borderBottom': '1px solid transparent'
}

const BoxNoBorderSx = {
	'&:hover': {
		'background': 'var(--body-bg-color-dark)',
	}
}

const BoxAdvNoBorderSx = {
	'&:hover': {
		'background': 'var(--body-bg-color-dark)',
	}
}

const IconSx = {
	height: '40px',
	width: '40px',
	'&:hover': { color: '#ddd', cursor: 'pointer' }
}

const TableFavoriteIconSx = {
	'&:hover': { color: '#ddd', cursor: 'pointer' },
	'verticalAlign': 'middle',
	'marginBottom': '0.5rem'
}

const ListTblToggleSx = (selected: string, button: string) => {
	if (selected === 'list' && button === 'listbtn') {
		return { bgcolor: '#121212', border: 'none', marginTop: '0.5rem',  width: '56px', height: '56px', '&:hover': { bgcolor: '#121212', border: 'none' } }
	}
	else if (selected === 'table' && button === 'listbtn') {
		return { bgcolor: '#383838', border: 'none', marginTop: '0.5rem', width: '56px', height: '56px', '&:hover': { bgcolor: '#121212', border: 'none' } }
	}
	else if (selected === 'table' && button === 'tblbtn') {
		return { bgcolor: '#121212', border: 'none', marginTop: '0.5rem', width: '56px', height: '56px', '&:hover': { bgcolor: '#121212', border: 'none' } }
	}
	else { //selected === 'list' && button === 'tbltn'
		return { bgcolor: '#383838', border: 'none', marginTop: '0.5rem', width: '56px', height: '56px', '&:hover': { bgcolor: '#121212', border: 'none' } }
	}
}

const AscDescSx = (selected: string, button: string) => {
	if (selected === 'asc' && button === 'ascbtn') {
		return { bgcolor: '#121212', border: 'none', color: '#ddd', font: 'Inter', fontWeight: '700', fontSize: '15px', marginTop: '0.5rem', width: '150px', height: '56px', '&:hover': { bgcolor: '#121212', border: 'none', fontWeight: '700' } }
	}
	else if (selected === 'desc' && button === 'ascbtn') {
		return { bgcolor: '#383838', border: 'none', color: '#ddd', font: 'Inter', fontSize: '15px', marginTop: '0.5rem', width: '150px', height: '56px', '&:hover': { bgcolor: '#121212', border: 'none', fontWeight: '700' } }
	}
	else if (selected === 'desc' && button === 'descbtn') {
		return { bgcolor: '#121212', border: 'none', color: '#ddd', font: 'Inter', fontWeight: '700', fontSize: '15px', marginTop: '0.5rem', width: '150px', height: '56px', '&:hover': { bgcolor: '#121212', border: 'none', fontWeight: '700' } }
	}
	else { //selected === 'asc' && button === 'descbtn'
		return { bgcolor: '#383838', border: 'none', color: '#ddd', font: 'Inter', fontSize: '15px', marginTop: '0.5rem', width: '150px', height: '56px', '&:hover': { bgcolor: '#121212', border: 'none', fontWeight: '700' } }
	}
}



export { ButtonSx, BoxSx, ButtonActiveSx, BoxActiveSx, IconSx, TableFavoriteIconSx, ListTblToggleSx, AscDescSx, ButtonAdvSx, ButtonAdvActiveSx, BoxAdvSx, BoxAdvActiveSx, BoxNoBorderSx, BoxAdvNoBorderSx }