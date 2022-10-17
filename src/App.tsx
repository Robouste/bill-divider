import { Button, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { blue, cyan } from "@mui/material/colors";
import "./App.scss";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: blue,
		secondary: cyan,
	},
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline enableColorScheme>
				<Button>Test</Button>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
