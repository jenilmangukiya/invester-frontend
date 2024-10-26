import { CssBaseline, ThemeProvider } from "@mui/material";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./Auth";
import { SnackbarAlertProvider } from "./components";
import { Router } from "./routes/Routes";
import { theme } from "./components/Theme/theme";

const client = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000, gcTime: 5000 } },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={client}>
        <AuthProvider>
          <SnackbarAlertProvider>
            <Router />
          </SnackbarAlertProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
