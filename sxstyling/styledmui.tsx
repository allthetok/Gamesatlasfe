import { TextField, styled } from '@mui/material'

const MyTextField = styled(TextField)({
	color: '#dddddd',
	backgroundColor: '#202020'
})

const StyledComponents = () => {
	return <MyTextField>Styled Components</MyTextField>
}

export { MyTextField, StyledComponents }