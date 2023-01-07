import styled from "styled-components";
import { createElement as $ } from "react";
import { useState, useEffect } from "react";

const Advice = () => {

    const [advice, setAdvice] = useState("")

    const api_endpoint = "https://api.adviceslip.com/advice";

    // create a function to get the data
    async function getData() {
        const response = await fetch(api_endpoint);
        // check if we got the data
        if (response.ok) {
            const data = await response.json();
            setAdvice(data.slip.advice);
        } else {
            console.log(response);
            console.log("an error occured;")
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return $(Container, null, $(
        Card, null, $(Content, null, advice), $(Button, { onClick: () => getData() }, "hell yeah!"),
    ), $(Loader, null, $("div", { className: "line" }, $("div", { className: "hexagon" }))),)
}

export default Advice;


// styles
// !!!!!!!!!!!!!!!
const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: url('https://images.pexels.com/photos/916017/pexels-photo-916017.jpeg?auto=compress&cs=tinysrgb&w=400');
background-position: center;
background-repeat: no-repeat;
background-size: cover;
object-fit: center;
font-size: 2rem;
gap: 10rem;

`
const Card = styled.div`
  width: 40%;
  height: 20%;
background: #fff;
position: relative;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 1rem 2rem;
border-radius: 2rem;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

@media screen and (max-width: 600px) {
      width: 80%;
      height: 30%;

}


`
const Content = styled.p`
text-align: center;
padding: 1rem 2rem;
`
const Button = styled.a`
padding: 1rem 4rem;
  cursor: pointer;
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.6s;
  overflow: hidden;
background: #232946;
color: #eebbc3;
white-space: nowrap;

&:hover:before {
  transform: translateY(0);
}

&:before {
  content: "click me";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eebbc3;
color: #232946;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  transform: translateY(-100%);
}
`;

const Loader = styled.div`

.line {
    width: 15rem;
    border-bottom: 4px solid #fff;
    position: relative;
    animation: animateLine 2s linear infinite;
}
.hexagon {
    position: absolute;
    left: 0;
    bottom: 14px;
    width: 50px;
    height: 30px;
    background: #fff;
    animation: animateHexagon 2s linear infinite;

    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        transform: rotate(60deg);
    }
    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        transform: rotate(-60deg);
    }
}

@keyframes animateHexagon {
    0% {left: 0}
    /* to prevent it from going beyond the line, we subtract 100% from the total width */
    50% {left: calc(100% - 50px);
        // we want the hexagon to rotate using cycles, 1 cycle is 360d egrees
        transform: rotate(720deg);
    }
    100% {left: 0}
}

@keyframes animateLine {
    0% {transform: rotate(30deg)}
        25%{transform: rotate(0deg);}
        50%{transform: rotate(-30deg)}
        75%{transform: rotate(0deg)}
        100%{transform: rotate(30deg)}
}

`