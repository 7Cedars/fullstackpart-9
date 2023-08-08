import { Alert } from "@mui/material"

interface Props {
  error: String
}

const ErrorMessage = ({ error }: Props ) => ( 
  <Alert severity="error">{error}</Alert>
)

export default ErrorMessage