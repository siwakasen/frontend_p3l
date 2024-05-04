import React from 'react';
import Carousel from "react-material-ui-carousel";
import { Paper, useMediaQuery } from "@mui/material";

const CarouselSlider = () => {
    const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    return (
        <Carousel
            animation="fade"
            navButtonsAlwaysVisible
            autoPlay={true}
            timeout={2000}
            cycleNavigation={true}
            indicators={true}
            swipe={true}
            navButtonsProps={{
                style: {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    color: "black",
                    borderRadius: "50%",
                },
            }}
            indicatorContainerProps={{
                style: {
                    position: "absolute",
                    bottom: "0",
                    zIndex: "100",
                },
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    color: "white",
                },
            }}
            indicatorIconButtonProps={{
                style: {
                    color: "rgba(255, 255, 255, 0.5)",
                },
            }}
            sx={{
                borderRadius: "10px",
            }}
        >
            <Paper>
                <img src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/4/26/eb9fc3bf-b448-4a72-983c-0973dd402f99.jpg.webp?ect=4g" alt="1" style={{ width: "100%", height: lgDown ? "200px" : "100%" }} />
            </Paper>
            <Paper>
                <img src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/4/26/32d616cc-649c-4855-9919-05e59a137d3b.jpg.webp?ect=4g" alt="2" style={{ width: "100%", height: lgDown ? "200px" : "100%" }} />
            </Paper>
            <Paper>
                <img src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/4/26/895ff21e-4bf0-4187-a596-cd708e68ccea.jpg.webp?ect=4g" alt="3" style={{ width: "100%", height: lgDown ? "200px" : "100%" }} />
            </Paper>
        </Carousel>
    );
}

export default CarouselSlider;