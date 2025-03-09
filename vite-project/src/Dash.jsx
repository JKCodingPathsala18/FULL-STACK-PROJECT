import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import Crd from './Crd'
import Contact from './Contact'
import Menu from './Menu'
import Qty from './Qty'
import Ccrd from './Ccrd';
// import Covid from './Covid'

// Page Components
const Dashboard = () => <div>Dashboard Content</div>;


// Navigation Config
const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'menu', title: 'Menu', icon: <DashboardIcon /> },
  { segment: 'food', title: 'FoodCat', icon: <DashboardIcon /> },
  { segment: 'qty', title: 'QtyMast', icon: <DashboardIcon /> },
  { segment: 'qty', title: 'TableMast', icon: <DashboardIcon /> },
  
  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
 
  { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
  { segment: 'crd', title: 'Card', icon: <LayersIcon /> },
  { segment: 'api', title: 'COVID', icon: <LayersIcon /> },
];

// Theme Configuration
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 } },
});

// Custom Router Hook
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);
  return router;
}

// Function to Render Components Dynamically
const getPageComponent = (pathname) => {
  switch (pathname) {
    case '/dashboard': return <Dashboard />;
    case '/menu': return <Menu />;
    case '/food': return <Contact />;
    case '/qty': return <Qty />;
    case '/integrations': return <Crd />;
    case '/crd': return <Ccrd />;
    case '/api': return <Covid/>;
    default: return <Dashboard />;
  }
};

export default function Dash(props) {
  const router = useDemoRouter('/dashboard'); // Default route
  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={2}>
            <Grid item xs={12}>{getPageComponent(router.pathname)}</Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
