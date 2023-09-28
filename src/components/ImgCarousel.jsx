import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";

const sliderItems = [
  {
    id: 1,
    img: "https://s3-img.pixpa.com/com/large/35557/35557-1636113092-pexels-gabb-tapique-3568546dsd.jpg",
    title: "SUMMER SALE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: "f5fafd",
    link: "/products/shirt",
  },
  {
    id: 2,
    img: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/a9468269-6732-4df5-ae04-dcec16057639/betrue-max90-t-shirt-CDjzLT.png",
    title: "SPORTS AESTHETIC",
    desc: "STAY SPORTY WITH THE SPORT APPAREL UNDER OFFERS",
    bg: "fcf1ed",
    link: "/products/shirt",
  },
  {
    id: 3,
    img: "https://dvyvvujm9h0uq.cloudfront.net/com/articles/1563945061-85839-runwayjpg.jpg",
    title: "DESIGNER COLLECTION",
    desc: "STEP OUT OF THE MEDIOCRE AND PULL OFF THE EXACT CLASSY",
    bg: "fbf0f4",
    link: "/products/shirt",
  },
];

const Container = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 20px;
  height: 20px;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}%);
`;

const Slide = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const Image = styled.img`
  min-width: 100%;
  object-fit: contain;
`;

const Slider = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {images?.map((item) => (
          <Slide>
            <Image src={item.img} />
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
