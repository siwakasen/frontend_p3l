import React from "react";
import { Box } from "@mui/material";
import ProductList from './skeleton/ProductList';
import ProductSidebar from './skeleton/ProductSidebar';
import AppCard from '@/components/shared/AppCard';

const Shop = () => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
    return (
        <Box mt={2}>
            <AppCard>
                {/* ------------------------------------------- */}
                {/* Left part */}
                {/* ------------------------------------------- */}
                <ProductSidebar
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
                />
                {/* ------------------------------------------- */}
                {/* Right part */}
                {/* ------------------------------------------- */}
                <Box p={3} flexGrow={1}>
                <ProductList onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
                </Box>
            </AppCard>
        </Box>
    );
}

export default Shop;